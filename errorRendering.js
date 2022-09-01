let renderError = function(err){
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nalance</title>
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
      <img class="menu_img" src="img/logo-white.png"></img>
    </nav>  
    <div class="login_cont">
      <h4 style="text-align:center" class="loginHead">Yikes, we cannot find what you are looking for.... [${err}]</h4>
      <img style="text-align:center; margin-left:120px" src="/img/error.png" alt="error">  
    </div>
  </body>
  <script type="module" src="/login.js"></script>
  </html>`
}


module.exports = {renderError}