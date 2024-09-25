import { AppError } from '../../../shared/errors/AppError'
import { SendMultiMessageService } from './SendMultiMessageService'

let sendMultiMessageService: SendMultiMessageService

describe('Envio de mensagens em massa', () => {
  beforeEach(() => {
    sendMultiMessageService = new SendMultiMessageService()
  })

  it('Não deve ser possível enviar mensagens se nenhum telefone for enviado', async () => {
    await expect(async () => {
      await sendMultiMessageService.execute({
        messageText: 'Mensagem de texto de exemplo',
        phones: [],
        userId: '_id_example',
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('Não deve ser possível enviar mensagens se o texto não for enviado', async () => {
    await expect(async () => {
      await sendMultiMessageService.execute({
        messageText: null,
        phones: ['61999999999'],
        userId: '_id_example',
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('Não deve ser possível enviar mensagens se o id do usuário não for enviado', async () => {
    await expect(async () => {
      await sendMultiMessageService.execute({
        messageText: 'Mensagem de texto de exemplo',
        phones: ['61999999999'],
        userId: null,
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
