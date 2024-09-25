import { injectable } from 'tsyringe'
import { instances } from '../../../shared/infra/http/server'
import { AppError } from '../../../shared/errors/AppError'

interface IRequest {
  phones: string[]
  messageText: string
  userId: string
}

@injectable()
export class SendMultiMessageService {
  async execute({ phones, messageText, userId }: IRequest): Promise<void> {
    if (phones.length === 0) throw new AppError('Nenhum telefone enviado')
    if (!messageText) throw new AppError('Mensagem de texto não enviada')
    if (!userId) throw new AppError('id do usuário não informado')

    console.log({
      phones,
      messageText,
    })

    const instance = instances.waSocket[userId]

    const promisesPhones = phones.map((phone) => {
      return instance.sendMessage(phone, { text: messageText })
    })

    await Promise.all(promisesPhones)
  }
}
