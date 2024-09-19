import { Router } from "express"

const instanceRoutes = Router()

instanceRoutes.get('/', async (req, res) => {
  return res.status(200).json({
    item: {
      connection: {
        status: 'connected',
        qrcode: ''
      }
    }
  })
})


export { instanceRoutes }