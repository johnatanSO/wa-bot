import { IUser } from '../../models/interfaces/IUser'

export interface IUserRepository {
  findByEmail: (email: string) => Promise<IUser>
  findById: (userId: string) => Promise<IUser>
  create: (email: string, password: string) => Promise<IUser>
}
