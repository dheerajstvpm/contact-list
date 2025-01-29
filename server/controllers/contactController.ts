import { Request, Response } from "express";
import Contact from "../models/contactDetails";
import { validationResult } from "express-validator";

const createContact = async (req: Request, res: Response) => {
  console.log(req.body)
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    console.log(validationErrors);
    res.status(404).send(validationErrors);
    return;
  }
  const { name, phone, email, address } = req.body;
  const contact = new Contact({ name, phone, email: email.toLowerCase(), address });
  try {
    const [phoneResult, emailResult] = await Promise.all([
      Contact.findOne({ phone: phone }),
      Contact.findOne({ email: email.toLowerCase() }),
    ]);
    if (phoneResult) {
      console.log("Phone number already exists");
      res.status(400).send("Phone number already exists");
    } else if (emailResult) {
      console.log("Email id already exists");
      res.status(400).send("Email id already exists");
    } else {
      const response = await contact.save()
      console.log(`Success: ${response}`);
      const contacts = await Contact.find({});
      res.status(200).json(contacts);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err)
  }
};

const readContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await Contact.find({});
    res.status(200).json(contacts);
  } catch (err) {
    console.log(err);
    res.status(404).send(err)
  }
};

const updateContact = async (req: Request, res: Response) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    console.log(validationErrors);
    res.status(404).send(validationErrors);
    return;
  }
  const { contactId, name, phone, email, address } = req.body;
  try {
    const [phoneResult, emailResult] = await Promise.all([
      Contact.findOne({ phone: phone }),
      Contact.findOne({ email: email.toLowerCase() }),
    ]);
    if (phoneResult) {
      console.log("Phone number already exists");
      res.status(400).send("Phone number already exists");
    } else if (emailResult) {
      console.log("Email id already exists");
      res.status(400).send("Email id already exists");
    } else {
      const response = await Contact.findOneAndUpdate(
        { _id: contactId },
        { $set: { name: name, phone: phone, email: email.toLowerCase(), address: address } });
      console.log(`Success: ${response}`);
      const contacts = await Contact.find({});
      res.status(200).json(contacts);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err)
  }
};

const deleteContact = async (req: Request, res: Response) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    console.log(validationErrors);
    res.status(404).send(validationErrors);
    return;
  }
  try {
    const response = await Contact.findOneAndDelete({ _id: req.body.contactId });
    console.log(`Success: ${response}`);
    const contacts = await Contact.find({});
    res.status(200).json(contacts);
  } catch (err) {
    console.log(err);
    res.status(400).send(err)
  }
};

const contactController = {
  createContact,
  readContacts,
  updateContact,
  deleteContact
};

export default contactController;