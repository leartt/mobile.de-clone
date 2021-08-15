import mongoose, { Schema, Document } from 'mongoose';
import validator from 'validator'

interface User {
   first_name: string,
   last_name: string,
   email: string,
   password: string,
   profile_image: string,
   role: string,
}

const UserSchema = new Schema<User>({
   first_name: {
      type: String,
      required: ['Please enter your first name'],
      minlength: [2, 'First name should be at least 2 characters long']
   },
   last_name: {
      type: String,
      required: ['Please enter your last name'],
      minlength: [2, 'Last name should be at least 2 characters long']
   },
   email: {
      type: String,
      required: ['Please enter your email'],
      validate: [validator.isEmail, 'Please provide a valid email address']
   },
   password: {
      type: String,
      required: ['Please enter a password'],
      minlength: [6, 'Password should be at least 6 characters long']
   },
   profile_image: {
      type: String,
   },
   role: {
      type: String,
      enum: ['ADMINISTRATOR', 'MEMBER'],
      default: "MEMBER",
      uppercase: true,
   },
}, { timestamps: true })

const UserModel = mongoose.model<User>('User', UserSchema);

export default UserModel;