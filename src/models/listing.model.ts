import mongoose, { Schema } from 'mongoose';

interface CarBrand {
   name: string
}

const CarBrandSchema = new Schema<CarBrand>({
   name: {
      type: String,
      required: ['Please provide a car brand name'],
   }
}, { timestamps: true, })


interface CarModel {
   name: string,
}

const CarModelSchema = new Schema<CarModel>({
   name: {
      type: String,
      required: ['Please provide a car model name'],
   }
}, { timestamps: true, })


interface Listing {
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
   tranmission: string,
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
}

const ListingSchema = new Schema<Listing>({
   car_brand: {
      type: String,
      required: ['Please provide a car brand']
   },
   car_model: {
      type: String,
      required: ['Please provide a car model'],
   },
   first_registration: {
      year: {
         type: Number,
         required: ['Please provide a year of registration']
      },
      month: {
         type: String,
         required: ['Please provide a month of registration']
      }
   },
   title: {
      type: String,
      required: ['Please provide a title']
   },
   price: {
      type: Number,
      required: ['Please provide a price']
   },
   mileage: {
      type: Number,
      required: ['Please provide car mileage']
   },
   color: {
      type: String,
      required: ['Please provide a color']
   },
   doors: {
      type: String,
      required: ['Please provide number of doors']
   },
   category: {
      type: String,
      required: ['Please provide a category']
   },
   fuel: {
      type: String,
      required: ['Please provide a fuel type']
   },
   engine: {
      type: String,
      required: ['Please provide car engine type']
   },
   transmission: {
      type: String,
      required: ['Please provide a car transmission type']
   },
   performance: {
      ps: {
         type: Number,
         required: ['Please provide car PS information']
      },
      kw: {
         type: Number,
         required: ['Please provide car KW information']
      }
   },
   consumption: {
      combined: {
         type: Number,
         required: ['Please provide combined consumption']
      },
      urban: {
         type: Number,
         required: ['Please provide urban consumption']
      },
      extra_urban: {
         type: Number,
         required: ['Please provide extra-urban consumption']
      },
   },
   emission_class: {
      type: String,
      required: ['Please provide an emission class']
   },
   damaged: {
      type: Boolean,
      required: ['Please provide is damaged information']
   },
   roadworthy: {
      type: Boolean,
      required: ['Please provide is roadworthy information']
   },
   address: {
      postal_code: {
         type: Number,
         required: ['Please provide a postal code']
      },
      country: {
         type: String,
         required: ['Please provide a country']
      }
   },
   images: {
      type: [String]
   },
   extra_info: {
      type: String,
   }
});

const CarBrandModel = mongoose.model<CarBrand>('Car_Brand', CarBrandSchema);

const CarModelModel = mongoose.model<CarModel>('Car_Model', CarModelSchema);

const ListingModel = mongoose.model<Listing>('Listing', ListingSchema);

export { ListingModel, CarBrandModel, CarModelModel }