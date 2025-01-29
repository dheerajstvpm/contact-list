"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contactController_1 = __importDefault(require("./controllers/contactController"));
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.status(200).send("From API route");
});
router.post("/contacts", (0, express_validator_1.check)("name").notEmpty().withMessage("Please enter a Name"), (0, express_validator_1.check)("phone")
    .matches(/^[\d]{10}$/)
    .withMessage("Mobile number must contain exactly 10 numbers"), (0, express_validator_1.check)("phone")
    .matches(/^[6-9][\d]{9}$/)
    .withMessage("Please enter a valid mobile number"), (0, express_validator_1.check)("email")
    .matches(/^$|^(\w+([-+.]?\w+)?@\w+(\.\w{2,3})(\.\w{2})?)$/)
    .withMessage("Please enter a valid email id"), contactController_1.default.createContact);
router.get("/contacts", contactController_1.default.readContacts);
router.patch("/contacts", (0, express_validator_1.check)("name").notEmpty().withMessage("Please enter a Name"), (0, express_validator_1.check)("phone")
    .matches(/^[\d]{10}$/)
    .withMessage("Phone number must contain exactly 10 numbers"), (0, express_validator_1.check)("phone")
    .matches(/^[6-9][\d]{9}$/)
    .withMessage("Please enter a valid phone number"), (0, express_validator_1.check)("email")
    .matches(/^$|^(\w+([-+.]?\w+)?@\w+(\.\w{2,3})(\.\w{2})?)$/)
    .withMessage("Please enter a valid email id"), contactController_1.default.updateContact);
router.delete("/contacts", contactController_1.default.deleteContact);
exports.default = router;
