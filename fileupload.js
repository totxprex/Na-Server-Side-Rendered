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







//File Upload to AWS S3
const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3")

const s3 = new S3Client({
  credentials: {
    accessKeyId: "AKIAWTRTNEBVIE7A2SWR",
    secretAccessKey: "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"
  },
  region: "eu-west-3"
})


fileUploadRoute.post("/test", upload.single("photo"), function (req, res) {
  sharp(req.file.buffer)
    .resize(300, 300)
    .toFormat("jpeg")
    .jpeg({ quality: 80 })
    .toBuffer().then(async function (buffer) {
      const command = new PutObjectCommand({
        Bucket: "natours-test-2",
        Key: `${Date.now()}-testing.jpeg`,
        Body: buffer,
        ContentType: req.file.mimetype
      })

      const done = await s3.send(command)

      res.status(200).send(done)
    })
})


const { getSignedUrl } = require("@aws-sdk/s3-request-presigner")

fileUploadRoute.get("/get/:names", function (req, res) {
  let requests = req.params.names.split(",")
  let arr = []

  requests.forEach(function (e, i, arrr) {
    const command = new GetObjectCommand({
      Key: e,
      Bucket: "natours-test-2"
    })

    getSignedUrl(s3, command).then(function(data){
      arr.push(data)

      if(i === arrr.length -1){
        res.status(200).send({
          status: "All",
          data: arr
        })
      }
    })
  })
})



fileUploadRoute.delete("/delete/:postname", function(req, res){
  let postname = req.params.postname

  const command = new DeleteObjectCommand({
    Key: postname,
    Bucket: "natours-test-2"
  })

  s3.send(command).then(function(d){
    res.status(200).send(d)
  })
})