import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

const MONGO_USERNAME = process.env.MONGO_USERNAME
const MONGO_PASSWORD = process.env.MONGO_PASSWORD
const mongoURL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@wa-bot-cluster.r7ayi.mongodb.net/?retryWrites=true&w=majority&appName=wa-bot-cluster`

mongoose.connect(mongoURL)
mongoose.connection
  .on('error', console.error.bind(console, 'MongoDB connection error'))
  .once('open', () => {
    console.log('MongoDB connection success')
  })

export { mongoose }
