import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const animal = new mongoose.Schema({
  pic: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  email: { type: String, required: true, match: /.+\@.+\..+/ },
  phone: { type: Number, required: false, match: /^$|^\d{10}$/ },
});

animal.plugin(uniqueValidator);

export default mongoose.models.animal || mongoose.model("animal", animal);
