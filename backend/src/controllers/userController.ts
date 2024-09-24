import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { AuthenticateService } from '../useCases/user/authenticate/AuthenticateService'
import { CreateNewService } from '../useCases/user/createNew/CreateNewService'

export class UserController {
  async authenticate(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body

    const authenticateService = container.resolve(AuthenticateService)
    const { user, token, refreshToken } = await authenticateService.execute({
      email,
      password,
    })

    return res.status(200).json({
      success: true,
      message: 'Usuário autenticado com sucesso',
      user,
      token,
      refreshToken,
    })
  }

  async register(req: Request, res: Response): Promise<Response> {
    const { email, password, confirmPassword } = req.body

    const createNewService = container.resolve(CreateNewService)
    const newUser = await createNewService.execute({
      email,
      password,
      confirmPassword,
    })

    return res.status(201).json({
      success: true,
      message: 'Usuário cadastrado com sucesso',
      item: newUser,
    })
  }
}
