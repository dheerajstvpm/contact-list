import mongoose from "mongoose";

const { Schema } = mongoose;

const contactSchema = new Schema(
  {
    name: String,
    phone: String,
    email: String,
    address: {
      street: String,
      city: String,
      state: String,
      zip: String
    }
  },
  { timestamps: true },
);

const contactDetails = mongoose.model("Contact", contactSchema);

export default contactDetails;