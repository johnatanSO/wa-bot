import { Router } from 'express'
import { MessageController } from '../../../../controllers/messageController'

const messageController = new MessageController()

const messageRoutes = Router()

messageRoutes.post('/sendMultiMessage/', messageController.sendMultiMessage)

export { messageRoutes }
