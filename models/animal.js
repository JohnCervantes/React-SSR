import mongoose from "mongoose";

const animal = new mongoose.Schema({
  name: String,
  color: String,
  age: Number,
});

export default mongoose.models.animal || mongoose.model("animal", animal);;
