import 'reflect-metadata'
import '../../container'
import cors from 'cors'
import 'express-async-errors'
import * as dotenv from 'dotenv'
import { routes } from './routes'
import { Mongoose } from 'mongoose'
import { mongoose } from '../mongodb'
import { AppError } from '../../errors/AppError'
import express, { Express, NextFunction, Request, Response } from 'express'

dotenv.config()

interface CustomExpress extends Express {
  mongo?: Mongoose
}

const app: CustomExpress = express()

app.mongo = mongoose

app.use(express.json())
app.use(cors())
app.use(routes)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    })
  }

  return res.status(500).json({
    success: false,
    status: 'error',
    message: `Server error - ${err.message}`,
  })
})

app.get('/', (req, res) => res.send('Server online'))

export { app }
