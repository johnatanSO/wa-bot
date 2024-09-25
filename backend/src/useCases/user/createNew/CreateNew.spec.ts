import { LocalUserRepository } from '../../../repositories/userRepository/LocalUserRepository'
import { AppError } from '../../../shared/errors/AppError'
import { CreateNewService } from './CreateNewService'

let localUserRepository: LocalUserRepository
let createNewService: CreateNewService

describe('Cadastro de usuário', () => {
  beforeEach(() => {
    localUserRepository = new LocalUserRepository()
    createNewService = new CreateNewService(localUserRepository)
  })

  it('Não deve ser possível cadastrar usuário se o e-mail não for informado', async () => {
    await expect(async () => {
      await createNewService.execute({
        email: null,
        password: '123',
        confirmPassword: '123',
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('Não deve ser possível cadastrar usuário se a senha não for informada', async () => {
    await expect(async () => {
      await createNewService.execute({
        email: 'example@example.com',
        password: null,
        confirmPassword: '123',
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('Não deve ser possível cadastrar usuário se a confirmação de senha não for informada', async () => {
    await expect(async () => {
      await createNewService.execute({
        email: 'example@example.com',
        password: '123',
        confirmPassword: null,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('Não deve ser possível cadastrar usuário se as senhas forem diferentes', async () => {
    await expect(async () => {
      await createNewService.execute({
        email: 'example@example.com',
        password: '123',
        confirmPassword: '321',
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
