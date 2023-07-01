import express from 'express'
const router = express.Router()
import statusCode from '../../config/http-status-code.js'
import adminChk from '../midwares/admin-check.js'
import user from './user.js'
import kick from './kick.js'
import exam from './exam.js'
import problem from './problem.js'
import solution from './solution.js'

router.use(adminChk)

router.use('/u(ser(s)?)?', user)
router.use('/k(ick)?', kick)
router.use('/exam', exam)
router.use('/problem', problem)
router.use('/solution', solution)

router.all('*', (req, res) => {
  res.sendStatus(statusCode.notFound)
})

export default router
