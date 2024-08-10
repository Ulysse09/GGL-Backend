require("dotenv").config();
const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const port = process.env.PORT || 3001;
const cors = require("cors");
app.use(cors());
app.use(express.json());

// environment variables

const emailUser = process.env.EMAIL_USER;
const emailService = process.env.EMAIL_SERVICE;
const emailPassword = process.env.EMAIL_PASSWORD;
const recipientEmail = process.env.RECIPIENT_EMAIL;

const transporter = nodemailer.createTransport({
  service: emailService,
  auth: {
    user: emailUser,
    pass: emailPassword,
  },
});

app.post("/send-email", (req, res) => {
  console.log(__dirname);
  const { subject, name, email, text } = req.body;
  const mailOptions = {
    from: emailUser,
    to: recipientEmail,
    name,
    subject,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${text}`,
    replyTo: email,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error sending Mail");
    } else {
      console.log("Email sent:" + info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

app.listen(port, () => {
  console.log(`server running on ${port}, `);
});
