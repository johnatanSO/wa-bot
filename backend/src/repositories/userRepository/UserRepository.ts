import { Model } from 'mongoose'
import { IUserRepository } from './IUserRepository'
import { UserModel } from '../../models/mongoose/entities/User'
import { IUser } from '../../models/interfaces/IUser'

export class UserRepository implements IUserRepository {
  model: Model<IUser>

  constructor() {
    this.model = UserModel
  }

  async findByEmail(email: string): Promise<IUser> {
    const user = await this.model.findOne({ email }).lean()

    return user
  }

  async create(email: string, password: string): Promise<IUser> {
    const newUser = await this.model.create({
      email,
      password,
    })

    await newUser.save()

    return newUser
  }

  async findById(userId: string): Promise<IUser> {
    return await this.model.findById(userId)
  }
}
