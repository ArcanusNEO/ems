import express from 'express'
const router = express.Router()
import statusCode from '../../config/http-status-code.js'
import adminChk from '../midwares/admin-check.js'
import user from './user.js'

router.use(adminChk)

router.use('/u(ser(s)?)?', user)

router.all('*', (req, res) => {
  res.sendStatus(statusCode.notFound)
})

export default router
