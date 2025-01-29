"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const api_1 = __importDefault(require("./api"));
dotenv_1.default.config();
mongoose_1.default.set("strictQuery", true);
mongoose_1.default
    .connect(String(process.env.mongoDbUri))
    .then(() => {
    console.log("Connected to db");
})
    .catch((error) => {
    console.log(error);
});
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.listen(3000, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Server running on port: 3000");
});
app.get('/', (req, res) => {
    res.status(200).send('Success');
});
app.use('/api', api_1.default);
app.use((req, res) => {
    res.status(404).send("Page not found");
});
