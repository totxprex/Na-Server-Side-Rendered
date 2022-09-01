let nodemailer = require('nodemailer')

let emailer = function (emailOptions) {

  let transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 25,
    secure: false,
    auth: {
      user: "ee3ae1e1718976",
      pass: "7b92081c0d5267"
    }
  })

  transport.sendMail(emailOptions).then(function(){
    console.log("Email send")
  })

}


module.exports = {emailer}