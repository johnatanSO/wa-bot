import mongoose from 'mongoose'
import { IUser } from '../../interfaces/IUser'

const userSchema = new mongoose.Schema({
  email: { type: String },
  password: { type: String },
})

export const UserModel = mongoose.model<IUser>('User', userSchema)
