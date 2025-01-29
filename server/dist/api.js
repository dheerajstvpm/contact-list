"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contactController_1 = __importDefault(require("./controllers/contactController"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.status(200).send("From API route");
});
router.post("/contacts", contactController_1.default.createContact);
router.get("/contacts", contactController_1.default.readContacts);
router.patch("/contacts", contactController_1.default.updateContact);
router.delete("/contacts", contactController_1.default.deleteContact);
exports.default = router;
