
let emitTourPage = function (data) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tour Page</title>
    <link rel="icon" href="/img/favicon.png">
    <link rel="stylesheet" href="/index.css">
    <link rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,500;1,500&family=Roboto+Flex:opsz,wght@8..144,100;8..144,300;8..144,1000&display=swap">
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@200&family=Roboto+Flex:opsz,wght@8..144,100;8..144,300;8..144,1000&display=swap"
      rel="stylesheet">
    <link rel="stylesheet" href="/leaflet/leaflet.css">
  </head>
  <body class="tourPage">
    <nav class="navbarCont_tourPage">
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
    <div class="image_large">
      <div class="title">${data.name}</div>
      <br>
      <div class="lil_details">🌍 ${data.startLocation.description} &nbsp; &nbsp; &nbsp; &nbsp; 📆 ${data.startLocation.address}</div>
    </div>
    <div class="screen2_cont">
      <div class="div1">
        <div>
          <h3 style="margin-left: 10px;">QUICK FACTS</h3>
          <ul>
            <li class="list">
              🌍 NEXT DATE <span style="color: rgb(99, 96, 96);"> &nbsp; &nbsp; ${new Intl.DateTimeFormat('en-GB', {
    dateStyle: "short"
  }).format(Date.now() + data.duration * 24 * 60 * 60 * 1000)}</span>
            </li>
            <li class="list">
              🚩 DIFFICULTY <span style="color: rgb(99, 96, 96);"> &nbsp; &nbsp; ${data.difficulty.slice(0, 1).toUpperCase() + data.difficulty.slice(1)}</span>
            </li>
            <li class="list">
              🙎 PARTICIPANTS <span style="color: rgb(99, 96, 96);"> &nbsp; &nbsp;${data.maxGroupSize} People</span>
            </li>
            <li class="list">
              📆 RATING <span style="color: rgb(99, 96, 96);"> &nbsp; &nbsp; ${data.ratingsAverage}/5</span>
            </li>
          </ul>
        </div>
        <div>
          <h3 style="margin-top: 30px;">YOUR TOUR GUIDES</h3>
          <ul class="tour_guides_lists">
            <li class="list_tour">
              <img class="tourGuide_img" src="/img/leo.jpg" alt=""> TOUR GUIDE <span style="color: rgb(99, 96, 96);">
                Avril
                Lavange</span>
            </li>
            <li class="list_tour">
              <img class="tourGuide_img" src="/img/leo.jpg" alt=""> TOUR GUILDE <span style="color: rgb(99, 96, 96);">
                Avril
                Lavange</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="div2">
        <h2 class="abt">ABOUT THE PARK CAMPERT TOUR</h2>
        <p>
          ${data.description.replaceAll("\n", "<br><br>")}.
        </p>
      </div>
    </div>
    <div class="screen3_image_gallery">
      <img src="/img/tours/tour-1-1.jpg" alt="">
      <img src="/img/tours/tour-1-2.jpg" alt="">
      <img src="/img/tours/tour-1-2.jpg" alt="">
    </div>
    <div id="map">
  
    </div>
    <div class="review_cont">
      <div class="each_rev_cont">
        <div class="each_reviews">
          <img class="review_img" src="/img/leo.jpg" alt=""> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <h5>Arya Stark</h5>
          <p>
            It is a long established fact that a reader will be distracted by the readable content of a page when looking
            at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as
            opposed to using 'Content here, content here', making it look like readable English
          </p>  
          <img class="review_star" src="/img/1_star.png" alt="">
        </div>
      </div>
    </div>
    <footer class="ft">
      <a href="" target="_blank" alt="Home">Home</a>
      <a href="" target="_blank">About</a>
      <a href="" target="_blank">Login</a>
      <a href="" target="_blank">Contact Us</a>
    </footer>
  </body>
  <script src="/leaflet/leaflet.js"></script>
  <script type="module" src="/tourPage.js"></script>
  </html>`
}


let emitLoginPage = function () {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Log In</title>
    <link rel="icon" href="/img/favicon.png">
    <link rel="stylesheet" href="/index.css">
    <link rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,500;1,500&family=Roboto+Flex:opsz,wght@8..144,100;8..144,300;8..144,1000&display=swap">
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@200&family=Roboto+Flex:opsz,wght@8..144,100;8..144,300;8..144,1000&display=swap"
      rel="stylesheet">
    <link rel="stylesheet" href="/leaflet/leaflet.css">
  </head>
  <body class="tourPage">
    <nav class="navbarCont_tourPage">
      <p style="color: white;" class="screen_title">
        ALL TOURS
      </p>
      <img class="menu_img" src="img/logo-white.png"></img>
      <div class="menu">
        <button class="login_Btn">Log In</button>
        <button class="signup_Btn">Sign Up</button>
        <img src="/img/user_placeholder.png" class="profile hide">
      </div>
    </nav>  
    <div class="login_cont">
      <h4 class="loginHead">LOG INTO YOUR ACCOUNT</h4>
      <p class="ltext">
        Email Address
      </p>
      <input class="in" type="email" name="email" placeholder="email@gmail.com">
      <br>
      <p class="ltext">
        Password
      </p>
      <input class="in2" type="password" name="email" placeholder="password"> 
      <button class="lbtn">Log In</button>
      <br>
      <br>
      <a href="" class="forgot">Forgot Password</a>
    </div>
    <div class="resetPass_cont hide">
      <h4 class="loginHead stat">PASSWORD RESET</h4>
      <p class="ltext">
        Email Address
      </p>
      <input class="resetIn" type="email" name="email" placeholder="email@gmail.com">
      <br>
      <button class="resetbtn">Send Reset Link</button>
    </div>
  </body>
  <script type="module" src="/login.js"></script>
  </html>`
}

let emitSignUpPage = function () {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign Up</title>
    <link rel="icon" href="/img/favicon.png">
    <link rel="stylesheet" href="/index.css">
    <link rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,500;1,500&family=Roboto+Flex:opsz,wght@8..144,100;8..144,300;8..144,1000&display=swap">
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@200&family=Roboto+Flex:opsz,wght@8..144,100;8..144,300;8..144,1000&display=swap"
      rel="stylesheet">
    <link rel="stylesheet" href="/leaflet/leaflet.css">
  </head>
  <body class="tourPage">
    <nav class="navbarCont_tourPage">
      <p style="color: white;" class="screen_title">
        ALL TOURS
      </p>
      <img class="menu_img" src="img/logo-white.png"></img>
      <div class="menu">
        <button class="login_Btn">Log In</button>
        <button class="signup_Btn">Sign Up</button>
        <img src="/img/user_placeholder.png" class="profile hide">
      </div>
    </nav>
    <form class="login_cont_signup">
      <h4 class="signupHead">SIGN UP</h4>
      <p class="ltext">
        Name
      </p>
      <input class="inSignupName" type="text" name="name" placeholder="John Doe">
      <br>
      <p class="ltext">
        Email Address
      </p>
      <input class="inSignupEmail" type="email" name="email" placeholder="email@gmail.com">
      <br>
      <p class="ltext">
        Password
      </p>
      <input class="inSignupPass" type="password" name="email" placeholder="password">
      <br>
      <p class="u">
      Upload Profile Image
    </p>
      <input class="photoInput" name="profilePic" type="file" accept="image/jpg,image/png" placeholder="Image">
      <progress class="progress hide">Loading</progress>
      <button class="sbtn">Sign Up!</button>
    </form>
  </body>
  <script type="module" src="/signup.js"></script>
  </html>`
}

let emitProfilePage = function (data) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Profile</title>
    <link rel="icon" href="/img/favicon.png">
    <link rel="stylesheet" href="/index.css">
    <link rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,500;1,500&family=Roboto+Flex:opsz,wght@8..144,100;8..144,300;8..144,1000&display=swap">
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@200&family=Roboto+Flex:opsz,wght@8..144,100;8..144,300;8..144,1000&display=swap"
      rel="stylesheet">
    <link rel="stylesheet" href="/leaflet/leaflet.css">
  </head>
  <body class="tourPage">
    <nav class="navbarCont_tourPage">
      <p style="color: white;" class="screen_title">
        ALL TOURS
      </p>
      <img class="menu_img" src="img/logo-white.png"></img>
      <div class="menu">
        <button class="signout_Btn">Sign Out</button>
        <img src="/img/user_placeholder.png" class="profileImg ">
      </div>
    </nav>
    <div class="profile_cont">
      <div class="side_menu">
        <div class="s clicked">
          ✴️ &nbsp;&nbsp;&nbsp; SETTINGS
        </div>
        <div class="ms">
          📑 &nbsp;&nbsp;&nbsp; MY BOOKMARK
        </div>
        <div class="mr">
          ⛺ &nbsp;&nbsp;&nbsp; MY REVIEWS
        </div>
        <div class="h">
          💵 &nbsp;&nbsp;&nbsp; BILLING
        </div>
      </div>
      <form class="profile_form_cont">
        <h4 class="signupHead">YOUR ACCOUNT SETTINGS</h4>
        <p class="ltext">
          Name
        </p>
        <input class="pSignupName" type="text" name="name" placeholder="John Doe">
        <br>
        <p class="ltext">
          Email Address
        </p>
        <input class="pSignupEmail" type="email" name="email" placeholder="email@gmail.com">
        <br>
        <br>
        <img src="/img/user_placeholder.png" class="profileImg2">
        <input class="photoInput_profile" name="profilePic" type="file" accept="image/jpg,image/png">
        <progress class="progress hide">Loading</progress>
        <br>
        <button class="pbtn">Save Image</button>
        <hr class="hr">
        <h4 class="signupHead">PASSWORD CHANGE</h4>
        <p class="ltext">
          Current Password
        </p>
        <input class="pSignupName currPass" type="text" name="name" placeholder="*********">
        <br>
        <p class="ltext">
          New Password
        </p>
        <input class="pSignupEmail newPass" type="text" name="email" placeholder="*********">
        <p class="ltext">
          Confirm Password
        </p>
        <input class="pSignupEmail confirmPass" type="test" name="email" placeholder="*********">
        <progress class="progress hide">Loading</progress>
        <br>
        <button class="pbtn2">Save Password</button>
      </form>
    </div>
  </body>
  <script type="module" src="/profile.js"></script>
  </html>`
}

let emitEmailPage = function (message) {
  return `
  <!doctype html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>Simple Transactional Email</title>
      <style>           
        img {
          border: none;
          -ms-interpolation-mode: bicubic;
          max-width: 100%; 
        }  
        body {
          background-color: #f6f6f6;
          font-family: sans-serif;
          -webkit-font-smoothing: antialiased;
          font-size: 14px;
          line-height: 1.4;
          margin: 0;
          padding: 0;
          -ms-text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%; 
        }
  
        table {
          border-collapse: separate;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          width: 100%; }
          table td {
            font-family: sans-serif;
            font-size: 14px;
            vertical-align: top; 
        }
        .body {
          background-color: #f6f6f6;
          width: 100%; 
        }
        .container {
          display: block;
          margin: 0 auto !important;
          /* makes it centered */
          max-width: 580px;
          padding: 10px;
          width: 580px; 
        }
        .content {
          box-sizing: border-box;
          display: block;
          margin: 0 auto;
          max-width: 580px;
          padding: 10px; 
        }
  
        /* -------------------------------------
            HEADER, FOOTER, MAIN
        ------------------------------------- */
        .main {
          background: #ffffff;
          border-radius: 3px;
          width: 100%; 
        }
  
        .wrapper {
          box-sizing: border-box;
          padding: 20px; 
        }
  
        .content-block {
          padding-bottom: 10px;
          padding-top: 10px;
        }
  
        .footer {
          clear: both;
          margin-top: 10px;
          text-align: center;
          width: 100%; 
        }
          .footer td,
          .footer p,
          .footer span,
          .footer a {
            color: #999999;
            font-size: 12px;
            text-align: center; 
        }
  
        /* -------------------------------------
            TYPOGRAPHY
        ------------------------------------- */
        h1,
        h2,
        h3,
        h4 {
          color: #000000;
          font-family: sans-serif;
          font-weight: 400;
          line-height: 1.4;
          margin: 0;
          margin-bottom: 30px; 
        }
  
        h1 {
          font-size: 35px;
          font-weight: 300;
          text-align: center;
          text-transform: capitalize; 
        }
  
        p,
        ul,
        ol {
          font-family: sans-serif;
          font-size: 14px;
          font-weight: normal;
          margin: 0;
          margin-bottom: 15px; 
        }
          p li,
          ul li,
          ol li {
            list-style-position: inside;
            margin-left: 5px; 
        }
  
        a {
          color: #3498db;
          text-decoration: underline; 
        }
  
        /* -------------------------------------
            BUTTONS
        ------------------------------------- */
        .btn {
          box-sizing: border-box;
          width: 100%; }
          .btn > tbody > tr > td {
            padding-bottom: 15px; }
          .btn table {
            width: auto; 
        }
          .btn table td {
            background-color: #ffffff;
            border-radius: 5px;
            text-align: center; 
        }
          .btn a {
            background-color: #ffffff;
            border: solid 1px #3498db;
            border-radius: 5px;
            box-sizing: border-box;
            color: #3498db;
            cursor: pointer;
            display: inline-block;
            font-size: 14px;
            font-weight: bold;
            margin: 0;
            padding: 12px 25px;
            text-decoration: none;
            text-transform: capitalize; 
        }
  
        .btn-primary table td {
          background-color: #3498db; 
        }
  
        .btn-primary a {
          background-color: #3498db;
          border-color: #3498db;
          color: #ffffff; 
        }
  
        /* -------------------------------------
            OTHER STYLES THAT MIGHT BE USEFUL
        ------------------------------------- */
        .last {
          margin-bottom: 0; 
        }
  
        .first {
          margin-top: 0; 
        }
  
        .align-center {
          text-align: center; 
        }
  
        .align-right {
          text-align: right; 
        }
  
        .align-left {
          text-align: left; 
        }
  
        .clear {
          clear: both; 
        }
  
        .mt0 {
          margin-top: 0; 
        }
  
        .mb0 {
          margin-bottom: 0; 
        }
  
        .preheader {
          color: transparent;
          display: none;
          height: 0;
          max-height: 0;
          max-width: 0;
          opacity: 0;
          overflow: hidden;
          mso-hide: all;
          visibility: hidden;
          width: 0; 
        }
  
        .powered-by a {
          text-decoration: none; 
        }
  
        hr {
          border: 0;
          border-bottom: 1px solid #f6f6f6;
          margin: 20px 0; 
        }
  
        /* -------------------------------------
            RESPONSIVE AND MOBILE FRIENDLY STYLES
        ------------------------------------- */
        @media only screen and (max-width: 620px) {
          table.body h1 {
            font-size: 28px !important;
            margin-bottom: 10px !important; 
          }
          table.body p,
          table.body ul,
          table.body ol,
          table.body td,
          table.body span,
          table.body a {
            font-size: 16px !important; 
          }
          table.body .wrapper,
          table.body .article {
            padding: 10px !important; 
          }
          table.body .content {
            padding: 0 !important; 
          }
          table.body .container {
            padding: 0 !important;
            width: 100% !important; 
          }
          table.body .main {
            border-left-width: 0 !important;
            border-radius: 0 !important;
            border-right-width: 0 !important; 
          }
          table.body .btn table {
            width: 100% !important; 
          }
          table.body .btn a {
            width: 100% !important; 
          }
          table.body .img-responsive {
            height: auto !important;
            max-width: 100% !important;
            width: auto !important; 
          }
        }
  
        /* -------------------------------------
            PRESERVE THESE STYLES IN THE HEAD
        ------------------------------------- */
        @media all {
          .ExternalClass {
            width: 100%; 
          }
          .ExternalClass,
          .ExternalClass p,
          .ExternalClass span,
          .ExternalClass font,
          .ExternalClass td,
          .ExternalClass div {
            line-height: 100%; 
          }
          .apple-link a {
            color: inherit !important;
            font-family: inherit !important;
            font-size: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
            text-decoration: none !important; 
          }
          #MessageViewBody a {
            color: inherit;
            text-decoration: none;
            font-size: inherit;
            font-family: inherit;
            font-weight: inherit;
            line-height: inherit;
          }
          .btn-primary table td:hover {
            background-color: #34495e !important; 
          }
          .btn-primary a:hover {
            background-color: #34495e !important;
            border-color: #34495e !important; 
          } 
        }
  
      </style>
    </head>
    <body>

              <!-- START CENTERED WHITE CONTAINER -->
              <table role="presentation" class="main">
  
                <!-- START MAIN CONTENT AREA -->
                <tr>
                  <td class="wrapper">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td>
                          <p>Hi there,</p>
                          <p>${message}</p>
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                            <tbody>
                              <tr>
                                <td align="left">
                                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                    <tbody>
                                      <tr>
                                        <td> <a href="http://127.0.0.1:5500" target="_blank">Natours</a> </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
  
              <!-- END MAIN CONTENT AREA -->
              </table>
              <!-- END CENTERED WHITE CONTAINER -->
  
              <!-- START FOOTER -->
              <div class="footer">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td class="content-block">
                      <span class="apple-link">Company Inc, 3 Abbey Road, San Francisco CA 94102</span>
                      <br> Don't like these emails? <a href="http://i.imgur.com/CScmqnj.gif">Unsubscribe</a>.
                    </td>
                  </tr>
                  <tr>
                    <td class="content-block powered-by">
                      Powered by <a href="http://htmlemail.io">HTMLemail</a>.
                    </td>
                  </tr>
                </table>
              </div>
              <!-- END FOOTER -->
  
            </div>
          </td>
          <td>&nbsp;</td>
        </tr>
      </table>
    </body>
  </html>`
}

module.exports = { emitTourPage, emitLoginPage, emitSignUpPage, emitProfilePage, emitEmailPage }