import { Router } from 'express'
import { UserController } from '../../../../controllers/userController'

const userController = new UserController()

const userRoutes = Router()

userRoutes.post('/authenticate', userController.authenticate)

userRoutes.post('/register', userController.register)

export { userRoutes }
