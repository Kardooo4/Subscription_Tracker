import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "username is required"],
      trim: true,
      minLength: 2,
      maxLength: 30,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      trim: true,
      minLength: 10,
      maxLength: 30,
      match: [
        /\w+([/.-]?\w+)*@\w+([/.-]?\w+)*(\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
  },
  {
    timestamps: true, // ? so we know when this user was created and modified
  }
);

const User = mongoose.model("User", userSchema);
export default User;
