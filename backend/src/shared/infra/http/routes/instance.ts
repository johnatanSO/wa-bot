import { Router } from "express"
import { GetInstanceController } from "../../../../controllers/instance/GetInstanceController"

const getInstanceController = new GetInstanceController()

const instanceRoutes = Router()

instanceRoutes.get('/', getInstanceController.handle)


export { instanceRoutes }