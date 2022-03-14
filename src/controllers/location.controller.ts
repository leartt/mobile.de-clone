import { NextFunction, Request, Response } from 'express';
import Location from '../models/location.model';


const getLocations = async (req: Request, res: Response, next: NextFunction) => {

   try {
      const locations = await Location.find();

      return res.status(200).json({ success: true, locations })
   } catch (error) {
      next(error);
   }
}

const createLocation = async (req: Request, res: Response, next: NextFunction) => {


   const locationData: {
      city: string,
      country: string,
      longitude: string,
      latitude: string,
   } = req.body;

   try {
      const location = new Location(locationData);

      await location.save();

      return res.status(201).json({ success: true, message: "Location successfully added" })
   } catch (error) {
      next(error);
   }
}

export default { createLocation, getLocations }