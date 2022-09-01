let express = require('express')
let server = require('./server.js')
let html = require('./html-scripts-to-render.js')
let error = require('./errorRendering.js')

let viewRouterapp = express.Router()

viewRouterapp.get("/", function (req, res) {
  let startFinding = server.dbTours.find().populate("guides")
  startFinding.then(function (data) {
    let builtStr = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Natours</title>
      <link rel="icon" href="/img/favicon.png">
      <link rel="stylesheet" href="/index.css">
      <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,500;1,500&family=Roboto+Flex:opsz,wght@8..144,100;8..144,300;8..144,1000&display=swap">
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@200&family=Roboto+Flex:opsz,wght@8..144,100;8..144,300;8..144,1000&display=swap"
        rel="stylesheet">
    </head>
    
    <body>
      <nav class="navbarCont">
        <p style="color: white;" class="screen_title">
          ALL TOURS
        </p>
        <img class="menu_img" src="img/logo-white.png"></img>
        <div class="menu">
          <button class="login_Btn">Log In</button>
          <button class="signup_Btn">Sign Up</button>
          <button class="signout_Btn">Sign Out</button>
          <img src="/img/user_placeholder.png" class="profileImg ">
        </div>
      </nav>
      <div class="search_res">`

    data.forEach(function (e, i) {
      builtStr = builtStr + `<div class="each_search_res">
        <img src="/img/tours/tour-${i + 1}-1.jpg" class="each_res_img">
        <div class="tour_name_cont">
          ${e.name.trim()}
        </div>
        <p class="difficulty_duration">
          ${e.difficulty} ${e.duration}-DAY TOUR
        </p>
        <p class="tour_title">
          ${e.summary}
        </p>
        <div class="tour_details">
          <p>🌍 &nbsp; &nbsp; ${e.startLocation.description}</p>
          <p>📆 &nbsp; &nbsp; Miami, Us</p>
          <p>🚩 &nbsp; &nbsp; Miami, Us</p>
          <p>🙎 &nbsp; &nbsp; ${e.guides.length} Guide(s)</p>
        </div>
        <div class="each_res_footer">
          <div>
            <p class="dt"><b>$${e.price}</b>&nbsp; per person</p>
            <p class="dt"><b>${e.ratingsAverage} </b>&nbsp; rating (5)</p>
          </div>
          <button class="details_Btn">Details</button>
        </div>
      </div>`

      //If we have gotten to the last data of the db result
      if (i === data.length - 1) {
        builtStr = builtStr + `</div>
        <footer class="ft">
          <a href="" target="_blank" alt="Home">Home</a>
          <a href="" target="_blank">About</a>
          <a href="" target="_blank">Login</a>
          <a href="" target="_blank">Contact Us</a>
        </footer>
      </body>
      <script src="/alltours.js"></script>
      </html>`

        res.status(200).header({
          "content-type": "text/html"
        }).send(builtStr)
      }
    })
  }).catch(function (err) {
    res.status(200).header({
      "content-type": "text/html"
    }).send(error.renderError(err.message))
  })
})

viewRouterapp.get("/viewtour", function (req, res) {
  let tour = req.query.tourname.replaceAll(`-`, ` `)
  server.dbTours.findOne({ name: tour }).then(function (data) {
    let tourObj = data
    res.status(200).header({
      "content-type": "text/html"
    }).send(html.emitTourPage(tourObj))
  }).catch(function (err) {
    res.status(200).header({
      "content-type": "text/html"
    }).send(error.renderError(err.message))
  })
})


viewRouterapp.get("/vlogin", function (req, res) {
  res.status(200).header({
    "content-type": "text/html"
  }).send(html.emitLoginPage())
})

viewRouterapp.get("/vsignup", function (req, res) {
  res.status(200).header({
    "content-type": "text/html"
  }).send(html.emitSignUpPage())
})

viewRouterapp.get("/vprofile", function (req, res) {
  res.status(200).header({
    "content-type": "text/html"
  }).send(html.emitProfilePage())
})






module.exports = { viewRouterapp }