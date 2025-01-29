import mongoose from "mongoose";

const { Schema } = mongoose;

const contactSchema = new Schema(
  {
    name: String,
    phone: String,
    email: String,
    address: String,
  },
  { timestamps: true },
);

const contactDetails = mongoose.model("Contact", contactSchema);

export default contactDetails;