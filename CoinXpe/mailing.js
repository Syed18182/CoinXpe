const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "coinxpe@gmail.com",
    pass: "Bitcoinkings@007",
  },
});

exports.sendthisMail = async function (toaddress, savedotp) {
  var mailOptions = {
    from: "coinxpe@gmail.com",
    to: toaddress,
    subject: "Registration CoinXPe",
    text:
      "Your OTP for registeration is\n\t" +
      savedotp +
      "\nThis OTP is confidential\n Don't share this OTP with anyone...\nThank You\nTeam COinXPe...",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Email error: " + error);
    } else {
      console.log("Email sent: " + info.response + " to " + toaddress);
    }
  });
};
