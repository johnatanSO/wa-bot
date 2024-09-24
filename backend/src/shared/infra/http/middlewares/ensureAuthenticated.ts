import { NextFunction, Request, Response } from 'express'
import { AppError } from '../../../errors/AppError'
import auth from '../../../../config/auth'
import { verify } from 'jsonwebtoken'
import { UserRepository } from '../../../../repositories/userRepository/UserRepository'

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authorization = req.headers.authorization

  if (!authorization) throw new AppError('Token não enviado')

  const [, token] = authorization.split(' ')

  try {
    const { sub: userId } = verify(token, auth.secretToken)

    const userRepository = new UserRepository()
    const user = await userRepository.findById(userId.toString())

    if (!user) throw new AppError('Usuário inválido', 401)

    req.user = {
      _id: userId.toString(),
    }

    next()
  } catch (err) {
    console.log('Error ensureAuthenticated - ', err.message)
    throw new AppError('Token inválido', 401)
  }
}
