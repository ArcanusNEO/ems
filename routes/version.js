import express from 'express'
const router = express.Router()
import statusCode from '../config/http-status-code.js'
import db from '../utils/database.js'
import fs from 'fs-extra'
import fileUpload from 'express-fileupload'
import path from 'path'
import compressing from "compressing"
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
import loginChk from './midwares/login-check.js'

router.get('/', (req, res) => {
  return res.end('Powered by Lucas.')
})

router.get('/mem', (req, res) => {
  return res.json(process.memoryUsage())
})

router.get('/ip', (req, res) => {
  return res.end(req.ip)
})

router.get('/error', (req, res) => {
  throw Error("error!")
})

export default router
