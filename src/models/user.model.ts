import mongoose, { Schema, Document, HookNextFunction } from 'mongoose';
import validator from 'validator'
import bcrypt from 'bcryptjs';

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
      minlength: [6, 'Password should be at least 6 characters long'],
      select: false
   },
   profile_image: {
      type: String,
   },
   role: {
      type: String,
      enum: ['ADMINISTRATOR', 'MEMBER'],
      default: "MEMBER",
      uppercase: true,
   }
}, { timestamps: true })

UserSchema.pre('save', async function (next: HookNextFunction) {

   const user: User = this;

   const salt: string = await bcrypt.genSalt(10);

   const hashedPassword = await bcrypt.hash(this.password, salt);

   user.password = hashedPassword;

   next();

})

const UserModel = mongoose.model<User>('User', UserSchema);

export default UserModel;