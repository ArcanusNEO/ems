import express from 'express'
const router = express.Router()
import statusCode from '../../config/http-status-code.js'
import db from '../../utils/database.js'

router.get('/sid/:sid(\\d+)', async (req, res) => {
  const query = 'SELECT * FROM "solution" WHERE "sid" = $1'
  const ret = (await db.query(query, [req.params.sid])).rows[0]
  return res.status(statusCode.ok).json(ret)
})

router.get('/pid/:pid(\\d+)', async (req, res) => {
  const query = 'SELECT * FROM "solution" WHERE "pid" = $1'
  const ret = (await db.query(query, [req.params.pid])).rows
  return res.status(statusCode.ok).json(ret)
})

router.get('/uid/:uid(\\d+)', async (req, res) => {
  const query = 'SELECT * FROM "solution" WHERE "uid" = $1'
  const ret = (await db.query(query, [req.params.uid])).rows
  return res.status(statusCode.ok).json(ret)
})

router.patch('/:sid(\\d+)', async (req, res) => {
  const { score, status } = req.body
  const query = 'UPDATE "solution" SET "score" = $1, "status" = $2'
  await db.query(query, [score, status])
  return res.sendStatus(statusCode.ok)
})

const autoJudgeProblem = async (pid) => {
  const queryInfo = 'SELECT "answer", "type", "score" FROM "problem" WHERE "pid" = $1'
  const retInfo = (await db.query(queryInfo, [pid])).rows[0]
  const answer = parseInt(retInfo.answer)
  const type = parseInt(retInfo.type)
  const score = parseInt(retInfo.score)
  if (type !== 0) return false
  const query = 'UPDATE "solution" SET "status" = -1, "score" = CASE WHEN "answer" = $1 THEN $2 ELSE 0 END WHERE "pid" = $3'
  await db.query(query, [answer, score, pid])
  return true
}

router.post('/auto/pid/:pid(\\d+)', async (req, res) => {
  if (await autoJudgeProblem(req.params.pid)) return res.sendStatus(statusCode.ok)
  return res.sendStatus(statusCode.forbidden)
})

router.post('/auto/eid/:eid(\\d+)', async (req, res) => {
  const eid = req.params.eid
  const query = 'SELECT "pid", "type" FROM "problem" WHERE "eid" = $1'
  const ret = (await db.query(query, [eid])).rows
  for (const each of ret) {
    const { pid, type } = each
    if (parseInt(type) === 0) await autoJudgeProblem(pid)
  }
  return res.sendStatus(statusCode.ok)
})

export default router
