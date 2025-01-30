import express, { Request, Response } from "express";
import logger from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import api from "./api";

dotenv.config();
mongoose.set("strictQuery", true);
mongoose
  .connect(String(process.env.mongoDbUri))
  .then(() => {
    console.log("Connected to db");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();
app.use(logger('dev'));
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.listen(3000, (error: Error | undefined) => {
  if (error) {
    console.log(error);
  }
  console.log("Server running on port: 3000");
})
app.get('/', (req: Request, res: Response) => {
  res.status(200).json('Success');
})
app.use('/api', api)
app.use((req: Request, res: Response) => {
  res.status(404).json("Page not found");
})
