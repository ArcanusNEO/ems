import express from 'express'
const router = express.Router()
import statusCode from '../config/http-status-code.js'
import admin from './admin/admin.js'
import email from './email.js'
import login from './login.js'
import logout from './logout.js'
import reset from './reset.js'
import signup from './signup.js'
import user from './user.js'
import version from './version.js'

router.use('/a(dmin(istrator(s)?)?)?', admin)
router.use('/e(mail)?', email)
router.use('/login', login)
router.use('/logout', logout)
router.use('/r(eset)?', reset)
router.use('/signup', signup)
router.use('/u(ser(s)?)?', user)
router.use('/v(ersion)?', version)

router.all('*', (req, res) => {
  res.sendStatus(statusCode.notFound)
})

export default router
