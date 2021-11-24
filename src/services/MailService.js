import nodemailer from 'nodemailer'

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'devprojects75@gmail.com',
//     pass: ''
//   }
// });
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SENDGRID_KEY,
    },
  })
);

const mailOptions = {
  from: 'devprojects75@gmail.com',
  to: 'myfriend@yahoo.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

const MailService = transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

export default MailService;

// //---


// Send email with MailGun + Nodemailer - Nodejs
// https://www.youtube.com/watch?v=i62jmLC15qQ


// import nodemailer from 'nodemailer'
// import nodemailMailgun from 'nodemailer-mailgun-transport'

// const auth = {
//     auth: {
//         api_key: '',
//         domain: ''
//     }
// }

// let transporter = nodemailer.createTransport(nodemailMailgun(auth))

// const mailOptions = {
//     from: "Food WP App <devs@test.ailgun.org>",
//     to: 'tonyfrenzy@gmail.com',
//     subject: 'Welcome, Verify Your Account',
//     text: 'Your token is 9UMCE38HR93NCWD9MDE390'
// }

// transporter.sendMail(mailOptions, function(err,  data)) {
//     if (err) {
//          console.log('Error:  ', err);
//     } else {
//          console.log('Message sent!!! ');
//     }
// }
// try(savedUser) => {
//   transporter.sendMail({
//     to: email,
//     from: "YOUR_SENDGRID_VERIFIED_EMAIL",
//     subject: "Verify your Account on FoodHub",
//     html: `
//                   <p>Please verify your email by clicking on the link below - FoodHub</p>
//                   <p>Click this <a href="http://localhost:3002/auth/verify/${token}">link</a> to verify your account.</p>
//                 `,
//   });
//   res.status(201).json({
//     message:
//       "User signed-up successfully, please verify your email before logging in.",
//     userId: savedUser._id,
//   });
// })catch((err) => {
//   if (!err.statusCode) err.statusCode = 500;
//   next(err);
// });


