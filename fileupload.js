let express = require('express')
let dbs = require('./server.js')
let html = require('./html-scripts-to-render')
let sharp = require('sharp')

let multer = require('multer')

let fileUploadRoute = express.Router()


let upload = multer({ storage: multer.memoryStorage() })

fileUploadRoute.post("/upload", upload.single("photo"), function (req, res, next) {
  if (!req.file.buffer) return res.status(404)

  let fileName = `${req.body.name}-${Date.now()}.jpg`
  sharp(req.file.buffer)
    .resize(300, 300)
    .toFormat("jpeg")
    .jpeg({ quality: 60 })
    .toFile(`./dev-data/img/users/${fileName}`).then(function () {
      dbs.dbUsers.findOneAndUpdate({ name: req.body.name.replaceAll(`-`, ` `) }, { photo: fileName }).then(function () {
        res.status(200).send({
          status: "File Uploaded"
        })
      })
    })
})


fileUploadRoute.post("/multipleImages", upload.array("img", 3), function (req, res) {

  req.files.forEach(function (e) {
    sharp(e.buffer).resize(400, 400).toFormat("jpeg").jpeg({ quality: 90 }).toFile(`./dev-data/img/${Date.now()}.jpeg`)
  })

  res.status(200).send("Done")
})

module.exports = { fileUploadRoute }
