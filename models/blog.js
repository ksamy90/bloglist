const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 5,
    required: true,
  },
  author: String,
  url: {
    type: String,
    minLength: 6,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    (returnedObject.id = returnedObject._id.toString()),
      delete returnedObject._id,
      delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
