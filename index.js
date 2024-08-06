import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

// Making The App
const app = express();

// Setting the MiddleWares
app.use(bodyParser.json());
dotenv.config();

// Make the Connection
await mongoose.connect(process.env.MONGO_URI);

// Make a Schema
const UserSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create a Model
const User = mongoose.model("users", UserSchema);

// Make a get Request to show all existing User
app.get("/", async (req, res) => {
  const allUser = await User.find({});
  res.json({ result: allUser });
});

// Make a Post request to insert The Data
app.post("/", async (req, res) => {
  const data = await req.body;
  let newUser = new User({
    id: data.id,
    username: data.username,
    password: data.password,
  });
  newUser.save();
  res.json({ result: "New User saved", newUser });
});

// Make a Put request to Update a User
app.put("/", async (req, res) => {
  const data = await req.body;
  let user = await User.findOneAndUpdate({ id: data.id }, data);
  res.json({ user });
});

// Make a delete Request To Delete a user
app.delete("/", async (req, res) => {
  const { id } = await req.body;
  let user = await User.deleteOne({ id: id });
  res.json({ result: "deleted a user", user });
});

// Run the App
app.listen(3000);
