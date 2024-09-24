import { injectable } from 'tsyringe'

interface IRequest {
  phones: string[]
  messageText: string
}

@injectable()
export class SendMultiMessageService {
  async execute({ phones, messageText }: IRequest): Promise<void> {
    console.log({
      phones,
      messageText,
    })
  }
}
