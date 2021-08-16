import { NextFunction, Request, Response } from 'express';
import { ListingModel as Listing } from '../models/listing.model';


/**
 * Get all listings
 * @method GET 
 */
const getListings = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const listings = await Listing.find({}).exec()

      return res.status(200).json({ success: true, listings });

   } catch (error) {
      next(error)
   }
}


/**
 * Create a new listing
 * @method POST 
 */
const createListing = async (req: Request, res: Response, next: NextFunction) => {

   const listingData: {
      car_brand: string,
      car_model: string,
      first_registration: {
         year: number,
         month: string,
      },
      title: string,
      price: number,
      mileage: number,
      color: string,
      doors: string,
      category: string,
      fuel: string,
      engine: string,
      transmission: string,
      performance: {
         ps: number,
         kw: number
      },
      consumption: {
         combined: number
         urban: number,
         extra_urban: number,
      },
      emission_class: string
      damaged: boolean,
      roadworthy: boolean,
      address: {
         postal_code: number,
         country: string,

      }
      images: string[];
      extra_info: string
   } = req.body;

   // const {
   //    car_model,
   //    first_registration: {
   //       year,
   //       month,
   //    },
   //    title,
   //    price,
   //    mileage,
   //    color,
   //    doors,
   //    category,
   //    fuel,
   //    engine,
   //    tranmission,
   //    performance: {
   //       ps,
   //       kw
   //    },
   //    consumption: {
   //       combined,
   //       urban,
   //       extra_urban,
   //    },
   //    emission_class,
   //    damaged,
   //    roadworthy,
   //    address: {
   //       postal_code,
   //       country,
   //    },
   //    extra_info
   // } = req.body;

   try {

      const listing = new Listing(listingData);
      await listing.save();

      return res.status(201).json({ success: true, message: "Listing has been created successfully", listing });

   } catch (error) {
      next(error)
   }
}


export default { getListings, createListing }