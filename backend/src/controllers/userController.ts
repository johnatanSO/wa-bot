import { Request, Response } from 'express'

export class UserController {
  async authenticate(req: Request, res: Response): Promise<Response> {
    const user = null

    return res.status(200).json({
      success: true,
      message: 'Usuário autenticado com sucesso',
      item: user,
    })
  }

  async register(req: Request, res: Response): Promise<Response> {
    const newUser = null

    return res.status(200).json({
      success: true,
      message: 'Usuário registrado com sucesso',
      item: newUser,
    })
  }
}
