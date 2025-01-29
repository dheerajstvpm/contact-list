"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contactDetails_1 = __importDefault(require("../models/contactDetails"));
const express_validator_1 = require("express-validator");
const createContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const validationErrors = (0, express_validator_1.validationResult)(req);
    if (!validationErrors.isEmpty()) {
        console.log(validationErrors);
        res.status(404).send(validationErrors);
        return;
    }
    const { name, phone, email, address } = req.body;
    const contact = new contactDetails_1.default({ name, phone, email, address });
    try {
        const response = yield contact.save();
        console.log(`Success: ${response}`);
        const contacts = yield contactDetails_1.default.find({});
        res.status(200).json(contacts);
    }
    catch (err) {
        console.log(err);
        res.status(404);
    }
});
const readContacts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contacts = yield contactDetails_1.default.find({});
        res.status(200).json(contacts);
    }
    catch (err) {
        console.log(err);
        res.status(404);
    }
});
const updateContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validationErrors = (0, express_validator_1.validationResult)(req);
    if (!validationErrors.isEmpty()) {
        console.log(validationErrors);
        res.status(404).send(validationErrors);
        return;
    }
    const { contactId, name, phone, email, address } = req.body;
    try {
        const response = yield contactDetails_1.default.findOneAndUpdate({ _id: contactId }, { $set: { name: name, phone: phone, email: email, address: address } });
        console.log(`Success: ${response}`);
        const contacts = yield contactDetails_1.default.find({});
        res.status(200).json(contacts);
    }
    catch (err) {
        console.log(err);
        res.status(404);
    }
});
const deleteContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validationErrors = (0, express_validator_1.validationResult)(req);
    if (!validationErrors.isEmpty()) {
        console.log(validationErrors);
        res.status(404).send(validationErrors);
        return;
    }
    try {
        const response = yield contactDetails_1.default.findOneAndDelete({ _id: req.body.contactId });
        console.log(`Success: ${response}`);
        const contacts = yield contactDetails_1.default.find({});
        res.status(200).json(contacts);
    }
    catch (err) {
        console.log(err);
        res.status(404);
    }
});
const contactController = {
    createContact,
    readContacts,
    updateContact,
    deleteContact
};
exports.default = contactController;
