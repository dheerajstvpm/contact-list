import express, { Request, Response } from 'express';
import contactController from './controllers/contactController';
import { check } from "express-validator";

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.status(200).json("From API route");
})

router.post("/contacts",
    check("name").notEmpty().withMessage("Please enter a Name"),
    check("phone")
        .matches(/^[\d]{10}$/)
        .withMessage("Mobile number must contain exactly 10 numbers"),
    check("phone")
        .matches(/^[6-9][\d]{9}$/)
        .withMessage("Please enter a valid mobile number"),
    check("email")
        .matches(/^$|^(\w+([-+.]?\w+)?@\w+(\.\w{2,3})(\.\w{2})?)$/)
        .withMessage("Please enter a valid email id"),
    contactController.createContact);

router.get("/contacts", contactController.readContacts);

router.patch("/contacts",
    check("name").notEmpty().withMessage("Please enter a Name"),
    check("phone")
        .matches(/^[\d]{10}$/)
        .withMessage("Phone number must contain exactly 10 numbers"),
    check("phone")
        .matches(/^[6-9][\d]{9}$/)
        .withMessage("Please enter a valid phone number"),
    check("email")
        .matches(/^$|^(\w+([-+.]?\w+)?@\w+(\.\w{2,3})(\.\w{2})?)$/)
        .withMessage("Please enter a valid email id"),
    contactController.updateContact);

router.post("/delete", contactController.deleteContact);

export default router;