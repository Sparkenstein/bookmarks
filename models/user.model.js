import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: String,
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  role: {
    type: String,
    default: "user",
    enum: ["admin", "user"],
  },
});

// DO NOT WRITE ARROW FUNCTION HERE
// UserSchema.pre("save", async function password(next) {
//   if (!this.isModified) {
//     this.password = await argon2.hash(this.password);
//   }
//   next();
// });

const UserModel = model("user", UserSchema);

export default UserModel;
