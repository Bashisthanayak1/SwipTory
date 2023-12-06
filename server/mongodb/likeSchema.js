const mongoose = require("mongoose");
// likeCount schema
const likeSchema = new mongoose.Schema({
    slideid: { type: String, unique: true }
});

// define a model for storing liked slide _ids
const LikeModel = mongoose.model("likesid", likeSchema);

module.exports = LikeModel;
