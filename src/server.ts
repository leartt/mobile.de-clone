import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import passport from "passport";
import configPassport from './config/passport';
import connectDB from "./db/MongoDB";

import apiRoutes from './routes/api';

dotenv.config();

console.log(process.env.JWT_TOKEN_SECRET)


// app initialization
const app: Application = express();

// middlewares
app.use(express.json());

app.use(passport.initialize());
configPassport(passport);


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
