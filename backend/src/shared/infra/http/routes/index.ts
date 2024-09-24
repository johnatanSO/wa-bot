import { Router } from 'express'
import { userRoutes } from './user'
import { messageRoutes } from './message'

const routes = Router()

routes.use('/user', userRoutes)
routes.use('/message', messageRoutes)

export { routes }
