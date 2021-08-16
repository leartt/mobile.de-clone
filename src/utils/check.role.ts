import { NextFunction, Request, Response } from "express";


export const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
   if (req.user?.["role"].toUpperCase() === 'ADMINISTRATOR') {
      return next();
   }

   return res.status(403).send('Forbidden');
}