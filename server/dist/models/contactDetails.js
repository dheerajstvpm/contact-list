"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const contactSchema = new Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
}, { timestamps: true });
const contactDetails = mongoose_1.default.model("Contact", contactSchema);
exports.default = contactDetails;
