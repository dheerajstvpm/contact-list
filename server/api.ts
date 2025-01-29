import express, { Request, Response } from 'express';
import contactController from './controllers/contactController';
import { check } from "express-validator";

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.status(200).send("From API route");
})

router.post("/contacts",
    check("name").notEmpty().withMessage("Please enter a Name"),
    check("phone")
        .matches(/[\d]{10}/)
        .withMessage("Mobile number must contain exactly 10 numbers"),
    check("phone")
        .matches(/^[6-9][\d]{9}/)
        .withMessage("Please enter a valid mobile number"),
    check('address').notEmpty()
        .withMessage('Please enter a Address'),
    check("email").notEmpty().withMessage("Please enter a email"),
    check("email")
        .matches(/^\w+([._]?\w+)?@\w+(\.\w{2,3})(\.\w{2})?$/)
        .withMessage("Please enter a valid email id"),
    contactController.createContact);

router.get("/contacts", contactController.readContacts);

router.patch("/contacts",
    check("name").notEmpty().withMessage("Please enter a Name"),
    check("phone")
        .matches(/[\d]{10}/)
        .withMessage("Phone number must contain exactly 10 numbers"),
    check("phone")
        .matches(/^[6-9][\d]{9}/)
        .withMessage("Please enter a valid phone number"),
    check('address').notEmpty()
        .withMessage('Please enter a Address'),
    check("email").notEmpty().withMessage("Please enter a email"),
    check("email")
        .matches(/^\w+([._]?\w+)?@\w+(\.\w{2,3})(\.\w{2})?$/)
        .withMessage("Please enter a valid email id"),
    contactController.updateContact);

router.delete("/contacts", contactController.deleteContact);

export default router;