import mongoose, { Schema } from 'mongoose';


interface Location {
   city: string,
   country: string,
   latitude: number,
   longitude: number,
}


const LocationSchema = new Schema<Location>({
   city: {
      type: String,
   },
   country: {
      type: String,
   },
   latitude: {
      type: Number,
   },
   longitude: {
      type: Number,
   },
})

const LocationModel = mongoose.model('Location', LocationSchema)

export default LocationModel;