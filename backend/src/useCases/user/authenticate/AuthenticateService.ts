import { inject, injectable } from 'tsyringe'
import { IUserRepository } from '../../../repositories/userRepository/IUserRepository'
import { AppError } from '../../../shared/errors/AppError'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import auth from '../../../config/auth'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  token: string
  refreshToken: null // TODO: Implementar refresh token
  user: {
    _id: string
    email: string
  }
}

@injectable()
export class AuthenticateService {
  userRepository: IUserRepository

  constructor(@inject('UserRepository') userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    if (!email || !password) {
      throw new AppError('E-mail e/ou senha não enviados')
    }

    const user = await this.userRepository.findByEmail(email)
    if (!user) throw new AppError('E-mail e/ou senha incorretos')

    const matchPassword = await compare(password, user.password)
    if (!matchPassword) throw new AppError('E-mail e/ou senha incorretos')

    const token = sign({}, auth.secretToken, {
      subject: user._id.toString(),
      expiresIn: auth.expiresInToken,
    })

    return {
      token,
      refreshToken: null,
      user: {
        _id: user._id.toString(),
        email: user.email,
      },
    }
  }
}
