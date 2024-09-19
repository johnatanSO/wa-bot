import { Router } from "express"

const instanceRoutes = Router()

instanceRoutes.get('/', GetInstanceController.handle)


export { instanceRoutes }