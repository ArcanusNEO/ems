import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import express from 'express'
const app = express()

import statusCode from './config/http-status-code.js'
import api from './routes/api.js'

app.set('trust proxy', true)

app.all('*', (req, res, next) => {
  res.header("Server", "Microsoft-IIS/7.0")
  res.header("X-AspNet-Version", "4.0.30319")
  res.header("X-Powered-By", ["ASP.NET", "ARR/2.5"])
  // res.header("Access-Control-Allow-Credentials", true)
  // res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,PATCH")
  res.header("Content-Type", "application/json;charset=utf-8")
  next()
})

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger(':date[iso] :remote-addr :method :url :status'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/', api)

app.use((req, res) => {
  res.sendStatus(statusCode.notFound)
})

export default app
