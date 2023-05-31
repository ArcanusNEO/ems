import express from 'express'
const router = express.Router()
import statusCode from '../../config/http-status-code.js'
import adminChk from '../midwares/admin-check.js'
import user from './user.js'
import kick from './kick.js'

router.use(adminChk)

router.use('/u(ser(s)?)?', user)
router.use('/k(ick)?', kick)

router.all('*', (req, res) => {
  res.sendStatus(statusCode.notFound)
})

export default router
