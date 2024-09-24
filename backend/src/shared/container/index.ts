import { container } from 'tsyringe'
import { UserRepository } from '../../repositories/userRepository/UserRepository'
import { IUserRepository } from '../../repositories/userRepository/IUserRepository'

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)
