let mongoose = require('mongoose')
let validator = require('validator')

let usersSchema = new mongoose.Schema({

  name: {
    type: String,
    trim: true,
    required: [true, "Name Required"]
  },
  email: {
    type: String,
    validate: {
      validator: validator.isEmail,
      message: "Error validating email"
    }
  },
  role: {
    type: String,
    enum: ["user", "admin", "guide", "lead-guide"],
    default: "user"
  },
  active: Boolean,
  photo: String,
  password: {
    type: String,
    required: [true, "User must have a password"],
    select: false
  }
})


usersSchema.index({ email: 1 }, { unique: true })


let tourSchema = new mongoose.Schema(
  {
    startLocation: Object,
    ratingsAverage: {
      type: Number,
      max: 5
    },
    ratingsQuantity: {
      type: Number,
    },
    images: [String],
    startDates: [String],
    name: {
      type: String,
      maxLength: 500,
      trim: true
    },
    duration: Number,
    maxGroupSize: Number,
    difficulty: {
      type: String,
      enum: ["medium", "easy", "difficult"]
    },
    guides: [{
      type: mongoose.Schema.ObjectId,
      ref: "Users"
    }],
    price: Number,
    summary: {
      type: String
    },
    imageCover: String,
    locations: [Object],
    description: {
      type: String
    }
  }, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

tourSchema.virtual('reviewsArr', {
  ref: "Reviews",
  foreignField: "tour",
  localField: "_id"
})


//A query middleware to populate the guides field upon a query from the Tour collection. To populate means to convert the ObjectId in the guides array that references the users in User's collection
tourSchema.pre('findOne', function (next) {
  this.populate("guides")
  next()
})




let reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    maxLength: 1000,
    required: [true, "No Review"]
  },
  rating: {
    type: Number,
    max: 5,
    min: 1
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "Users"
  },
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: "Tours"
  },
  createAt: {
    type: Date,
    default: Date.now()
  }
})



// reviewSchema.pre('find', function (next) {
//   this.populate("user")
//   next()
// })


module.exports = { usersSchema, tourSchema, reviewSchema }