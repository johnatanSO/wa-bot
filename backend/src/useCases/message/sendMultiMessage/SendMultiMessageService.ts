import { injectable } from 'tsyringe'
import { instances } from '../../../subscribers/baileys/Baileys'

interface IRequest {
  phones: string[]
  messageText: string
  userId: string
}

@injectable()
export class SendMultiMessageService {
  async execute({ phones, messageText, userId }: IRequest): Promise<void> {
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
