import express from 'express'
const router = express.Router()
import statusCode from '../config/http-status-code.js'
import admin from './admin/admin.js'
import email from './email.js'
import exam from './exam.js'
import problem from './problem.js'
import solution from './solution.js'
import login from './login.js'
import logout from './logout.js'
import reset from './reset.js'
import signup from './signup.js'
import user from './user.js'
import version from './version.js'

router.use('/a(dmin(istrator(s)?)?)?', admin)
router.use('/email(s)?', email)
router.use('/e(xam(s)?)?', exam)
router.use('/p(roblem(s)?)?', problem)
router.use('/s(olution(s)?)?', solution)
router.use('/login', login)
router.use('/logout', logout)
router.use('/r(eset)?', reset)
router.use('/signup', signup)
router.use('/u(ser(s)?)?', user)
router.use('/v(ersion)?', version)

router.use((err, req, res, next) => {
  console.error(err);
  return res.sendStatus(statusCode.forbidden)
});

router.all('*', (req, res) => {
  res.sendStatus(statusCode.notFound)
})

export default router
