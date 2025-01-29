import { Request, Response } from "express";
import Contact from "../models/contactDetails";

const createContact = async (req: Request, res: Response) => {
  try {
    const users = await Contact.find({});
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(404)
  }
};

const readContacts = async (req: Request, res: Response) => {
  try {
    const users = await Contact.find({});
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(404)
  }
};

const updateContact = async (req: Request, res: Response) => {
  try {
    const users = await Contact.find({});
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(404)
  }
};

const deleteContact = async (req: Request, res: Response) => {
  try {
    const users = await Contact.find({});
    res.status(200).json(users);
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