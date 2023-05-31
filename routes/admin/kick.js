import express from 'express'
const router = express.Router()
import sr from 'string-random'
import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
import statusCode from '../../config/http-status-code.js'

router.delete('/', async (req, res) => {
  try {
    const obj = { salt: sr(20) }
    await fs.writeJSON(path.resolve(__dirname, '../../config/salt.json'), obj)
    return res.sendStatus(statusCode.ok)
  } catch { }
  return res.sendStatus(statusCode.forbidden)
})

export default router