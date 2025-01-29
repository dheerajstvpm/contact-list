import express, { Request, Response } from 'express';
import contactController from './controllers/contactController';

const router = express.Router();
router.get('/', (req: Request, res: Response) => {
    res.status(200).send("From API route");
})
router.post("/contacts", contactController.createContact);
router.get("/contacts", contactController.readContacts);
router.patch("/contacts", contactController.updateContact);
router.delete("/contacts", contactController.deleteContact);

export default router;