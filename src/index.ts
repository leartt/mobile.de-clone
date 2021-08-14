import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./db/MongoDB";

dotenv.config();

const app: Application = express();

// middlewares
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hi from Express with TypeScript");
});

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
