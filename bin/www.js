#!/usr/bin/env node

import dotenv from 'dotenv'
dotenv.config()
import http from 'http'

import app from '../app.js'

const httpServer = http.createServer()
const port = parseInt(process.env.LISTEN_PORT)

  ; (async () => {
    app.set('port', port)
    httpServer.on('request', app)
    httpServer.listen(port)
    httpServer.on('listening', () => {
      console.log(`Listening on http://${process.env.LISTEN_ADDR}:${port}`)
    })
  })()
