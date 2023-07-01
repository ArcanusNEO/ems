import express from 'express'
const router = express.Router()
import statusCode from '../config/http-status-code.js'
import tokenUtils from '../utils/token.js'

router.post('/', (req, res) => {
  tokenUtils.remove(res, 'acc')
  return res.sendStatus(statusCode.ok)
})

export default router
