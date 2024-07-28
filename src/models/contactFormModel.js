import mongoose from "mongoose";

const ContactForm = mongoose.models.ContactForm || mongoose.model("ContactForm", new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 50,
  },
  message: {
    type: String,
    required: true,
    max : 250,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
  },
}, { timestamps: true }));

export default ContactForm;