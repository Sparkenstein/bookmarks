import mongoose, { Schema, model } from "mongoose";

const BookmarkSchema = new Schema({
  link: {
    type: String,
    required: true,
  },
  name: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const BookmarkModel = model("bookmark", BookmarkSchema);

export default BookmarkModel;
