import { container } from 'tsyringe'
import { SendMultiMessageService } from './../useCases/message/sendMultiMessage/SendMultiMessageService'
import { Request, Response } from 'express'

export class MessageController {
  async sendMultiMessage(req: Request, res: Response): Promise<Response> {
    const { phones, messageText } = req.body
    const { _id: userId } = req.user

    const sendMultiMessageService = container.resolve(SendMultiMessageService)
    await sendMultiMessageService.execute({
      phones,
      messageText,
      userId,
    })

    return res.status(201).json({
      success: true,
      message: 'Mensagens em massa enviadas com sucesso',
    })
  }
}
