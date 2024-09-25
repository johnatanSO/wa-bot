import { inject, injectable } from 'tsyringe'
import { IUserRepository } from '../../../repositories/userRepository/IUserRepository'
import { AppError } from '../../../shared/errors/AppError'
import { hash } from 'bcrypt'
import auth from '../../../config/auth'

interface IRequest {
  email: string
  password: string
  confirmPassword: string
}

interface IResponse {
  _id: string
  email: string
}

@injectable()
export class CreateNewService {
  userRepository: IUserRepository

  constructor(@inject('UserRepository') userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  async execute({
    email,
    password,
    confirmPassword,
  }: IRequest): Promise<IResponse> {
    if (!email) throw new AppError('E-mail não informado')
    if (!password) throw new AppError('Senha não informada')
    if (!confirmPassword) {
      throw new AppError('Confirmação de senha não informada')
    }

    const userAlreadyExist = await this.userRepository.findByEmail(email)

    if (userAlreadyExist) {
      throw new AppError('Já existe um usuário com este e-mail')
    }

    if (password !== confirmPassword) {
      throw new AppError('As senhas são diferentes')
    }

    const hashPassword = await hash(password, auth.salt)

    const newUser = await this.userRepository.create(email, hashPassword)

    return {
      _id: newUser._id.toString(),
      email: newUser.email,
    }
  }
}
