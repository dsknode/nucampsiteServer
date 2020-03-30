const mongoose = require("mongoose");
const { Schema } = mongoose;

const partnerSchema = new Schema(
  {
    featured: {
      type: Boolean
    },
    name: {
      type: String,
      unique: true,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Partner", partnerSchema);
