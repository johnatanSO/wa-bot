import { Router } from 'express'
import { MessageController } from '../../../../controllers/messageController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const messageController = new MessageController()

const messageRoutes = Router()

messageRoutes.post(
  '/sendMultiMessage/',
  ensureAuthenticated,
  messageController.sendMultiMessage,
)

export { messageRoutes }
