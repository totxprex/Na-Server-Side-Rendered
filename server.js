let express = require('express')
let app = express()
app.listen(5500, "127.0.0.1", function () {
  console.log("Natours Server Connected @ 127.0.0.1:5500")
})

let dotenv = require('dotenv')
dotenv.config({ path: "./config.env" })

let cors = require('cors')
app.use(cors({
  methods: ["GET", "POST", "PUT", "PATCH"],
  credentials: true,
  origin: "*"
}))

let morgan = require('morgan')
app.use(morgan('dev'))

app.use(express.json())

let helmet = require('helmet')


app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "img-src": ["'self'", "b.tile.openstreetmap.org", "c.tile.openstreetmap.org", "a.tile.openstreetmap.org", "data:"]
    },
  })
);

app.use(helmet.crossOriginEmbedderPolicy({ policy: "credentialless" }));

let mongoose = require('mongoose')


mongoose.connect(process.env.mongoConnect, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  console.log("DB Connected")
}).catch(function () {
  console.log("db connection error")
})

let bcrypt = require('bcryptjs')
let jwt = require('jsonwebtoken')

let errorResponce = function (resObj, message, error) {
  resObj.status(404).send({
    status: message || "Internal Server Error",
    error: error || "Error"
  })
}


app.use(function (request, responce, next) {
  if (request.body.password) {
    bcrypt.hash(request.body.password, 12).then(function (password) {
      request.body.password = password
      next()
    }).catch(function () {
      errorResponce(responce, "Error")
    })
  }
  else {
    next()
  }
})

app.param('key', function (req, res, next, param) {
  if (req.params.key !== "1680") {
    errorResponce(res, "Authetication Failed")
  }
  else {
    next()
  }
})

app.param('token', function (req, res, next) {
  jwt.verify(req.params.token, process.env.jwtkey, function (err, obj) {
    if (err) errorResponce(res, "Authentication Failed")
    else {
      next()
    }
  })
})

let schemas = require('./schemas.js')

let dbUsers = mongoose.model('Users', schemas.usersSchema)

let dbTours = mongoose.model('Tours', schemas.tourSchema)

let dbReviews = mongoose.model("Reviews", schemas.reviewSchema)

module.exports = { dbUsers, dbTours, dbReviews, errorResponce }


//Login to get jsonwebtoken

app.get('/login/:key/:email/:password', function (request, responce) {
  let username = request.params.email
  let password = request.params.password
  let startFinding = dbUsers.findOne({ email: username }).select('+password')

  startFinding.then(function (data) {
    if (!data) return errorResponce(responce, "Invalid Username")

    bcrypt.compare(password, data.password).then(function (verify) {
      if (!verify) return errorResponce(responce, "Invalid Password")

      let token = jwt.sign({ name: username }, process.env.jwtkey, {
        expiresIn: "24h"
      })

      responce.cookie('token', token, {
        secure: false,
        httpOnly: true,
        sameSite: true
      })

      responce.status(200).header({
        "content-type": "application/json"
      }).send({
        status: "User verified",
        token: token,
        name: data.name.replaceAll(` `, `-`)
      })
    })
  })
})




//Sign up user
app.post('/signup/:key', function (request, responce) {
  if (!request.body) return errorResponce(responce, "Error")

  dbUsers.findOne({ name: request.body.name }).then(function (data) {
    if (data) return errorResponce(responce, "User exists")

    dbUsers.create(request.body).then(function (data) {
      responce.status(200).header({
        "content-type": "application/json"
      }).send({
        status: "User Created"
      })
    }).catch(function (err) {
      errorResponce(responce, "Error", err.message)
    })
  })
})



//Password change
let { emailer } = require('./emailer.js')
let html = require("./html-scripts-to-render")

//send rest password link to user email
app.post('/reset/:key', function (req, res) {
  if (!req.body.email) errorResponce(res, "Invalid Request")

  dbUsers.findOne({ email: req.body.email }).then(function (data) {
    if (!data) errorResponce(res, 'User does not exist')

    let resetToken = jwt.sign({ email: req.body.email }, process.env.jwtkey, {
      expiresIn: "4m"
    })

    let emailOptions = {
      from: "natours@gmail.com",
      to: req.body.email,
      subject: "NATOURS RESET PASSWORD",
      text: `Here is your rest password link - \n http://127.0.0.1:5500/pass/${resetToken}`,
      html: html.emitEmailPage(`Here is your rest password link - <br> http://127.0.0.1:5500/pass/${resetToken}`)
    }

    emailer(emailOptions)

    res.status(200).send({
      status: "Check your email for verification link"
    })

  })
})

app.patch('/pass/:token', function (req, res) {
  if (!req.body.password) errorResponce(res, "Invalid Request")

  jwt.verify(req.params.token, process.env.jwtkey, function (err, obj) {
    if (err) errorResponce(res, "Error", err.message)

    dbUsers.findOneAndUpdate({ email: obj.email }, { password: req.body.password }, {
      runValidators: true
    }).then(function (data) {
      res.status(200).send({
        status: "Password Changed"
      })
    }).catch(function (err) {
      errorResponce(res, "Error", err.message)
    })
  })
})

//Password change via profile

app.patch("/p/:key/:token", function (req, res) {
  if (!req.body.oldPassword) return errorResponce(res, "Error")

  let startFinding = dbUsers.findOne({ email: req.body.email }).select("+password")
  startFinding.then(function (data) {

    if (!data) return errorResponce(res, "User does not exits")

    bcrypt.compare(req.body.oldPassword, data.password).then(function (verify) {
      if (!verify) return errorResponce(res, "Password Incorrect")
      dbUsers.findOneAndUpdate({ email: req.body.email }, { password: req.body.password }).then(function () {
        res.status(200).send({
          "status": "Password change succesful"
        })
      })
    })
  })

})





//General Users Route

app.route('/users/:key/:token/:name?').get(function (request, responce) {
  if (request.params.name) {
    dbUsers.findOne({ name: request.params.name.replaceAll(`-`, ` `) }).then(function (data) {
      if (!data) return errorResponce(responce, "Error")
      responce.status(200).header({
        "content-type": "application/json"
      }).send({
        "status": "Found one user",
        data: data
      })
    }).catch(function (err) {
      errorResponce(responce, "Error", err.message)
    })
  }
  else {
    dbUsers.find().then(function (data) {
      responce.status(200).header({
        "content-type": "application/json"
      }).send({
        status: "All Users Found",
        data: data
      })
    }).catch(function (err) {
      errorResponce(responce, "Error", err.message)
    })
  }
}).delete(function (request, responce) {
  if (!request.params.name) return errorResponce(responce, "Error")

  dbUsers.findOneAndDelete({ name: request.params.name.replaceAll(`-`, ` `) }).then(function (data) {
    responce.status(200).send("User Deleted")
  }).catch(function (err) {
    errorResponce(responce, "Error", err.message)
  })
})




//Tour Routes and Advanced Query

app.route("/tours/:key/:token/:tourName?").post(function (req, res) {

  if (!req.body) return errorResponce(res, "Error1")

  dbTours.create(req.body).then(function (data) {
    res.status(200).send({
      status: "Tour(s) Posted"
    })
  }).catch(function (err) {
    errorResponce(res, "Error")
  })
}).get(function (req, res) {
  if (req.params.tourName) {
    let startFinding = dbTours.findOne({ name: req.params.tourName.replaceAll(`-`, ` `) }).populate("reviewsArr guides")
    startFinding.then(function (data) {
      res.status(200).header({
        "content-type": "application/json"
      }).send({
        status: "Found One Tour",
        data: data
      })
    }).catch(function (err) {
      errorResponce(res, "error", err.message)
    })
  }
  else if (req.query.id) {
    dbTours.findById(req.query.id).then(function (data) {
      res.status(200).header({
        "content-type": "application/json"
      }).send({
        status: "Found a Tour by ID",
        data: data
      })
    }).catch(function (err) {
      errorResponce(res, "error", err.message)
    })
  }
  else {
    let queryObj = { ...req.query }

    let excludedFields = ["sort", "limit", "fields", "page"]

    excludedFields.forEach(function (e) {
      delete queryObj[e]
    })

    let newQuery = JSON.stringify(queryObj).replace(/\b(lt|lte|gt|gte)\b/g, function (match) {
      return `$${match}`
    })

    let startFinding = dbTours.find(JSON.parse(newQuery)).populate("guides")

    if (req.query.sort) {
      startFinding.sort(req.query.sort.replaceAll(`,`, ' '))
    }

    if (req.query.page) {
      let limit = Number(req.query.limit)
      let skip = Number((req.query.page - 1) * limit)

      startFinding.skip(skip).limit(limit)
    }

    if (req.query.fields) {
      startFinding.select(req.query.fields.replaceAll(`,`, ' '))
    }

    startFinding.then(function (data) {
      res.status(200).header({
        "content-type": "application/json"
      }).send({
        status: "Found Tours",
        data: data
      })
    }).catch(function (err) {
      errorResponce(res, "error", err.message)
    })

  }
}).delete(function (req, res) {
  if (!req.params.tourName) return errorResponce(res, "Invalid Tour")
  dbTours.findOneAndDelete({ name: req.params.tourName.replaceAll(`-`, ` `) }).then(function () {
    res.status(200).send("Tour Deleted :)")
  }).catch(function (err) {
    errorResponce(res, "error", err.message)
  })
})







//Aggregation! 
//Get Tour Stats

app.get('/tourstats/:key', function (req, res) {
  dbTours.aggregate([
    {
      $match: {}
    },
    {
      $group: {
        _id: null,
        totalOfAllPrices: { $sum: '$price' },
        maxPrice: { $max: '$price' },
        minPrice: { $min: '$price' },
        allPricesArray: { $push: '$price' }
      }
    },
    {
      $sort: { maxPrice: 1 }
    },
    {
      $project: { minPrice: 0 }
    },
    {
      $limit: 1
    }
  ]).then(function (data) {
    res.status(200).send({
      "status": "Aggregate Result Calculated",
      data: data
    })
  }).catch(function (err) {
    errorResponce(res, "Error Aggregating", err.message)
  })
})






//Reviews Route

let handlers = require('./handlers.js')

app.route('/reviews/:key/:token/:id?').get(function (req, res) {
  if (req.params.id) {
    let reviewID = req.params.id
    let startFinding = dbReviews.findById(reviewID).populate({
      path: "user"
    })
    startFinding.then(function (data) {
      res.status(200).header({
        "content-type": "application/json"
      }).send({
        status: "Success",
        data: data
      })
    }).catch(function (err) {
      errorResponce(res, "error", err.message)
    })
  }
  else {
    let startFinding = dbReviews.find()
    startFinding.then(function (data) {
      res.status(200).header({
        "content-type": "application/json"
      }).send({
        status: "Success",
        data: data
      })
    }).catch(function (err) {
      errorResponce(res, "error", err.message)
    })
  }
}).post(function (req, res) {
  if (!req.body.review) errorResponce(res, "error")
  let review = req.body
  review.user = req.query.user
  review.tour = req.query.tour
  dbReviews.create(review).then(function (data) {
    res.status(200).header({
      "content-type": "application/json"
    }).send({
      "status": "Review Added",
      data: data
    })
  }).catch(function (err) {
    errorResponce(res, "error", err.message)
  })
}).delete(handlers.deleteOneHandler(dbReviews))





//Server-Side Rendering

let serverSideRendering = require('./serverSideRender.js')

app.use(express.static(`./dev-data`))

app.use('/', serverSideRendering.viewRouterapp)






//File Upload
let { fileUploadRoute } = require('./fileupload.js')

app.use('/file', fileUploadRoute)










































































































































































































app.use(function (req, res) {
  res.send({
    status: "Cannot find route"
  })
})