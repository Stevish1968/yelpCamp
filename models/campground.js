const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./reviews");


const ImageSchema = new Schema({
  url: String,
  filename: String,
})

ImageSchema.virtual('thumbnail').get(function() {
  return this.url.replace('/upload/', '/upload/w_100/')
})
const opts = { toJSON: {virtuals: true} }

const CampgroundSchema = new Schema({
  title: String,
  images: [ImageSchema],
  geometry: {
    type: {
      type: String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
    },
  price: Number,
  description: String,
  location: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
},opts);

CampgroundSchema.virtual('properties.popUpMarkup').get(function() {
  return `
  <strong><a href="/campgrounds/${this._id}">${this.title}</a></strong>
  <p>${this.description.substring(0-40)}...</p>`;
})






CampgroundSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

module.exports = mongoose.model("Campground", CampgroundSchema);
