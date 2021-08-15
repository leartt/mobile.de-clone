import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import connectDB from "./db/MongoDB";

import apiRoutes from './routes/api';

dotenv.config();


// app initialization
const app: Application = express();

// middlewares
app.use(express.json());


// API Routes
app.use(apiRoutes);

// error middleware should be last middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
   if (!err.statusCode) {
      err.statusCode = 500;
   }
   return res.status(err.statusCode).json({ message: err.message, stack: err.stack });
}
);


const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
