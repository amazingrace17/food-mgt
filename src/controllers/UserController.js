import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import crypto from 'crypto';

import { User } from '../models/User.js';
// import MailService from '../services/MailService.js';

dotenv.config();

// const transporter = nodemailer.createTransport(
//   sendgridTransport({
//     auth: {
//       api_key: process.env.SENDGRID_KEY,
//     },
//   })
// );

const UserController = {
  generateSha256Hash: async (userEmail) => {
    const sha256Hash = crypto.createHash('sha256');
    const r = (Math.random() + 1).toString(36).substring(2);

    const data = sha256Hash.update(userEmail + r, 'utf-8');
    const gen_hash = data.digest('hex');
    
    return gen_hash;
  },
  
  register: async (req, res) => {
    const reqBody = req.body;
    const { username, firstname, lastname, email, phone, password, confirmPassword, role } = req.body;
    const reqFields = ['username', 'firstname', 'lastname', 'email', 'phone', 'password', 'confirmPassword', 'role'];

    try {
      if(password !== confirmPassword) {
        return res
          .status(400)
          .json({ status: 'failed', message: 'Passwords do not match' });
      }

      // find if email or username already exists
      const isUserExist = await User.findOne({ 
        $or: [{ username }, { email }] 
      });

      if(isUserExist) {
        return res
          .status(400).json({ 
            status: 'failed', 
            message: `username '${username}' is taken or a user with email '${email}' already exists`
          });
      }

      for (const field of reqFields) {
        if (!reqBody[field] ) {
          return res
            .status(400).json({ 
              status: 'failed', 
              message: `${field} field is required` 
            });
        }
      }

      if (!firstname || !lastname || !username || !email || !phone || !password || !confirmPassword || !role) {
        return res
          .status(400).json({ 
            status: 'failed', 
            message: 'please fill all required fields' 
          });
      }

      // password hash
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      if(hash) {
        // ✅ create vericiation token
        let verificationToken = await UserController.generateSha256Hash(email);
        // ✅ add to newUser
        const newUser = new User({ firstname, lastname, username, email, phone, role, password: hash, accountVerifyToken: verificationToken });
        const savedUser = await newUser.save();

        if(savedUser) {
          /**
           * 
          // transporter.sendMail({
          //   to: email,
          //   from: "YOUR_SENDGRID_VERIFIED_EMAIL",
          //   subject: "Verify your Account on Food Bargain",
          //   html: `
          //                 <p>Please verify your email by clicking on the link below - FoodHub</p>
          //                 <p>Click this <a href="http://localhost:5000/auth/verify/${token}">link</a> to verify your account.</p>
          //               `,
          // });
          // res.status(201).json({
          //   message:
          //     "User signed-up successfully, please verify your email before logging in.",
          //   userId: savedUser._id,
          // })
           * ❌ Send Verification email HERE...
           */
          // MailService.sendMail();
          jwt.sign(
            { id: savedUser._id },
            process.env.JWT_SECRET,
            { expiresIn: +process.env.JWT_EXPIRY },
            (err, token) => {
              if (err) {
                throw err;
              }

              res.status(200).json({ 
                status: 'success',
                data: {
                  id: savedUser._id,
                  firstname: savedUser.firstname,
                  lastname: savedUser.lastname,
                  username: savedUser.username,
                  email: savedUser.email,
                  phone: savedUser.phone,
                  role: savedUser.role,
                  verifyToken: savedUser.accountVerifyToken,
                  token: "Bearer " + token
                },
                message: 'user registration successful'
              });
            }
          );
        }
      }
    } catch (error) {
      return res.status(500).json({
        status: "failed",
        error
      })
    }
  },

  verifyUser: async (req, res) => {
    const { id, token } = req.params;
    const user = await User.findById(id).select(["-password", "-email", "-phone", "-role"]);
    

    if(!user) {
      return res.status(404).json({ 
        status: "failed", 
        message: "user not found" 
      });
    }
    
    if(user.isVerified) {
      return res.status(410).json({ 
        status: "failed", 
        message: "invalid token: user is already verified" 
      });
    }
    if(!token || token !== user.accountVerifyToken  /* || accountVerifyTokenExpiration isExpired */) {
      return res.status(405).json({ 
        status: "failed", 
        message: "invalid verification token" 
      });
    }

    try {
      if (token === user.accountVerifyToken) {
        
        user.isVerified = true;
        user.accountVerifyToken = '';
        user.accountVerifyTokenExpiration = '';
        user.save();

        return res.status(200).json({
          status: 'success',
          message: "successful verification", 
          data: {
            _id: user._id, 
            firstname: user.firstname, 
            lastname: user.lastname, 
            username: user.username, 
            isVerified: user.isVerified,
            verifyToken: user.accountVerifyToken,
            verifyTokenExpiration: user.accountVerifyTokenExpiration
          }
        })
      }

      return res.status(405).json({ 
        status: "failed", 
        message: "verification not successful" 
      });
    } catch (error) {
      return res.status(500).json({ 
        status: "failed", 
        message: error.message 
      });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    if(![email, password].every(Boolean)) {
      return res.status(400).json({ 
        status: "failed", 
        message: "enter your email/username and password!"
      });
    }

    try {
      const existingUser = await User.findOne({ 
        $or: [{ username: email }, { email: email }] 
      });

      if(!existingUser || !Object.keys(existingUser).length) {
        return res.status(404).json({ 
          status: "failed", 
          message: "record not found" 
        });
      }

      const isMatch = await bcrypt.compare(password, existingUser.password);
      
      // Prevents saved password from being visible to user
      delete res.isMatch;

      if(!isMatch) {
        return res.status(400).json({ 
          status: "failed", 
          message: "incorrect email/username or password"
        });
      }

      // Payload to be sent in token
      const { _id, firstname, lastname, username, isVerified, role } = existingUser;

      const payload = {
        user: {
          _id, firstname, lastname, username, isVerified, role
        }
      }

      // Generate token
      const token = jwt.sign(payload, process.env.JWT_SECRET, { 
        expiresIn: +process.env.JWT_EXPIRY
      });

      // If token is not generated
      if(!token) return res.status(401).json({
        status: "failed", 
        message: "error logging in. could not generate token."
      });

      return res.status(200).json({
        status: 'success',
        message: "login successful", 
        data: {
          _id, firstname, lastname, username, role, isVerified, 
          email: existingUser.email,
          token: `Bearer ${token}`
        }
      })

    } catch (error) {
      return res.status(500).json({ 
        status: "failed", 
        message: error.message 
      });
    }
  },

  profile: async (req, res) => {
    const { id } = req.params;
    
    try {
      const user = await User.findById(id).select("-password");

      if(!user) return res.status(404).json({
        status: 'failed',
        message: 'user not found'
      })

      if (id === req.user.id) {
        return res.status(200).json({
          status: 'success',
          message: 'successful',
          data: user
        });
      }

      return res.status(401).json({
        status: 'failed',
        message: 'only personal profile access allowed',
      });
    } catch (error) {
      return res.status(500).json({
        status: "failed",
        error: error.message
      })
    }
  },

  setProfileImage: async (req, res) => {
    const { id } = req.params;
    
    if(!req.file) {
      return res.status(400).json({
        status: "Failed",
        message: "Please select an image to upload"
      })
    }

    try {
      const data = await User.findByIdAndUpdate(
        { _id: id },
        { profileImg: req.file.path },
        { new: true }
      );

      return res.status(200).json({
        data,
        status: "Success",
        message: "Profile picture uploaded successfully!"
      })
    } catch (error) {
      res.status(500).json({
        status: "Failed",
        message: error.message
      })  
    }
  }
}

export default UserController;