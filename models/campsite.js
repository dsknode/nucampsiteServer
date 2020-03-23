const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const commentSchema = new Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
// two parameters
// first is an object with definition of schema
// second optional argument, used for setting config options
// timestamp = true, causes mongosse to add 2 properties: created at and updated at
// mongoose will manage these two for you
const campsiteSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  elevation: {
    type: Number,
    required: true
  },
  cost: {
    type: Currency,
    required: true,
    min: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  comments: [commentSchema]
}, {
  timestamps: true
});

// create model using schema
// creates model name campsite, 
/* first arg is capitalized nad signualr version of the
 collection we wnat to use fo rthis model*/
const Campsite = mongoose.model('Campsite', campsiteSchema);

module.exports = Campsite;