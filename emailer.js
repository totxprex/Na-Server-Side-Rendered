let nodemailer = require('nodemailer')

let emailer = function (emailOptions) {

  let transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 25,
    secure: false,
    auth: {
      user: "",
      pass: ""
    }
  })

  transport.sendMail(emailOptions).then(function(){
    console.log("Email send")
  })

}


module.exports = {emailer}
