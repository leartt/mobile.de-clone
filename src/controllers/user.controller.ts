import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.model';


/**
 * Get all users
 * @method GET 
 */
const getUsers = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const users = await User.find().exec();

      return res.status(200).json({ success: true, users });

   } catch (error) {
      next(error)
   }
}

/**
 * Get single user by ID
 * @param id
 * @method GET 
 */
const getUser = async (req: Request, res: Response, next: NextFunction) => {

   const { id } = req.params;

   try {
      const user = await User.findOne({ _id: id }).exec();

      return res.status(200).json({ success: true, user });

   } catch (error) {
      next(error)
   }
}


/**
 * Create a new user
 * @method POST
 */
const createUser = async (req: Request, res: Response, next: NextFunction) => {

   const { first_name, last_name, email, password, confirm_password, profile_image, role } = req.body;

   const userExist = await User.findOne({ email }).exec();

   if (userExist) {
      throw new Error('User with that email already exist.');
   }

   if (password !== confirm_password) {
      throw new Error('Password and Confirmation Password should match')
   }

   const salt: string = await bcrypt.genSalt(10);

   const hashedPassword: string = await bcrypt.hash(password, salt);

   try {
      const user = new User({
         first_name,
         last_name,
         email,
         password: hashedPassword,
         profile_image,
         role
      })

      await user.save();

      return res.status(200).json({ success: true, message: "Your account has been created successfully", user });

   } catch (error) {
      next(error)
   }
}

/**
 * Delete a user by ID
 * @param id
 * @method DELETE
 */
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {

   try {
      const { id } = req.params;

      await User.deleteOne({ _id: id });

      return res.status(200).json({ success: true, message: `User with ID "${id}" has been deleted successfully` });

   } catch (error) {
      next(error)
   }
}

export = { getUsers, getUser, createUser, deleteUser };