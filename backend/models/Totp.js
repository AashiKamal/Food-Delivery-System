
const mongoose = require("mongoose");
const { Schema } = mongoose;

const TotpSchema = new Schema({
  email: { type: String, required: true },
  secretKey: { type: String, required: true },
  token: { type: String },
});

module.exports = mongoose.model("totp", TotpSchema);

