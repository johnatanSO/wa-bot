import { Types } from 'mongoose'
import { IUser } from '../../models/interfaces/IUser'
import { IUserRepository } from './IUserRepository'

export class LocalUserRepository implements IUserRepository {
  model: IUser[]
  constructor() {
    this.model = []
  }

  async findByEmail(email: string): Promise<IUser> {
    return this.model.find((user) => user.email === email)
  }

  async findById(userId: string): Promise<IUser> {
    return this.model.find((user) => user._id.toString() === userId.toString())
  }

  async create(email: string, password: string): Promise<IUser> {
    const newUser = {
      _id: new Types.ObjectId(),
      email,
      password,
    }

    this.model.push(newUser)

    return newUser
  }
}
