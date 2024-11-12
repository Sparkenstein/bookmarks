import mongoose from "mongoose";

const mongodbURL = process.env.MONGODB_URL;

if (!mongodbURL) {
  console.error("No mongodb url configured");
  process.exit(1);
}

const connection = mongoose.connect(mongodbURL);

export { connection };
