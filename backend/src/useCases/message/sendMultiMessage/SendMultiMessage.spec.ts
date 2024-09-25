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
})
