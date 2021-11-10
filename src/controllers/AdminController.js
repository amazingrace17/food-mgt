import dotenv from 'dotenv';

import { User } from '../models/User.js';
// import MailService from '../services/MailService.js';

dotenv.config();

const AdminController = {
  makeAdmin: async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id).select(["-password", "-email", "-phone", "-role"]);
    
    if(!user) {
      return res.status(404).json({ 
        status: "failed", 
        message: "user not found" 
      });
    }
    
    if(!user.isVerified) {
      return res.status(410).json({ 
        status: "failed", 
        message: "unverified user accounts cannot be made an admin" 
      });
    }

    try {
      
      user.role = 'admin';
      user.save();
      // if (user.save()){

        return res.status(200).json({
          status: 'success',
          message: user.firstname +" "+ user.lastname +" is now an ADMIN", 
          data: {
            _id: user._id, 
            firstname: user.firstname, 
            lastname: user.lastname, 
            username: user.username, 
            isVerified: user.isVerified,
            role: user.role,
          }
        })
      // }

      return res.status(405).json({ 
        status: "failed", 
        message: "upgrade to admin not successful" 
      });
    } catch (error) {
      return res.status(500).json({ 
        status: "failed", 
        message: error.message 
      });
    }
  }
}

export default AdminController;