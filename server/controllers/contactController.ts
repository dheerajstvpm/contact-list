import { Request, Response } from "express";
import Contact from "../models/contactDetails";

const createContact = async (req: Request, res: Response) => {
  const { name, mobileNumber, email, address } = req.body;
  const contact = new Contact({ name, mobileNumber, email, address });
  try {
    const response = await contact.save()
    console.log(`Success: ${response}`);
    const contacts = await Contact.find({});
    res.status(200).json(contacts);
  } catch (err) {
    console.log(err);
    res.status(404)
  }
};

const readContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await Contact.find({});
    res.status(200).json(contacts);
  } catch (err) {
    console.log(err);
    res.status(404)
  }
};

const updateContact = async (req: Request, res: Response) => {
  const { contactId, name, mobileNumber, email, address } = req.body;
  try {
    const response = await Contact.findOneAndUpdate(
      { _id: contactId },
      { $set: { name: name, mobileNumber: mobileNumber, email: email, address: address } });
    console.log(`Success: ${response}`);
    const contacts = await Contact.find({});
    res.status(200).json(contacts);
  } catch (err) {
    console.log(err);
    res.status(404)
  }
};

const deleteContact = async (req: Request, res: Response) => {
  try {
    const response = await Contact.findOneAndDelete({ _id: req.body.contactId });
    console.log(`Success: ${response}`);
    const contacts = await Contact.find({});
    res.status(200).json(contacts);
  } catch (err) {
    console.log(err);
    res.status(404)
  }
};

const contactController = {
  createContact,
  readContacts,
  updateContact,
  deleteContact
};

export default contactController;