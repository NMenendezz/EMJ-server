import serviceAccountKey from './config/el-mundo-de-jonathan-firebase-adminsdk-1jvzj-0cd8e9aed0.json' assert { type: "json" }
import { errorHandler } from './middleware/errorHandler.js'
import categoryRouter from './routes/category.js'
import corsOptions from './config/corsOptions.js'
import authRouter from './routes/auth.js'
import postRouter from './routes/post.js'
import { logger } from './middleware/logger.js'
import connectDB from './config/connectDB.js'
import rootRouter from './routes/root.js'
import express, { json } from 'express'
import { fileURLToPath } from 'url'
import admin from 'firebase-admin'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'

dotenv.config()

connectDB()

const BASEURL = process.env.BASEURL
const PORT = process.env.PORT || 3001
const __dirname = path.dirname(fileURLToPath(import.meta.url))

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey)
})

const app = express()

app.disable('x-powered-by')

app.use(logger)
app.use(express.json())
// app.use(json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))
app.use(errorHandler)

app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/', rootRouter)
app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)
app.use('/api/categories', categoryRouter)

app.all('*', errorHandler)

app.listen(PORT, () => {
  console.log(`Server started at ${BASEURL}:${PORT}`)
})
