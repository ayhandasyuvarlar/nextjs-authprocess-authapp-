import { Schema, model } from "mongoose";

const userSchema = new Schema({
  userName: String,
  email: String,
  password: String,
});

const Users = model("user", userSchema);
export default Users;
