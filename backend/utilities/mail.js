const nodemailer = require("nodemailer");
const fs = require("fs");

module.exports = async (email, subject, message) => {
  let transporter = "";
  if (process.env.ENVIRONMENT !== "local") {
    transporter = nodemailer.createTransport({
      host: process.env.MAIL_SERVICE,
      port: 25,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL, // generated ethereal user
        pass: process.env.PASSWORD, // generated ethereal password
      },
    });
  } else {
    transporter = nodemailer.createTransport({
      host: process.env.FAKE_SERVICE,
      port: 25,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.FAKE_USERNAME, // generated ethereal user
        pass: process.env.FAKE_PASSWORD, // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  let param = await transporter.sendMail({
    from: `${process.env.SENDER_NAME} <${process.env.EMAIL}>`, // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    html: `${message}`, // html body
  });
  return true;
};
