const express = require('express')
const bodyParser = require('body-parser')
const spawn = require('spawn-promise')

let api = express.Router()
api.use(bodyParser.json())
api.use(bodyParser.urlencoded({extended: true}))

api.get('/info', (req, res) => {
  spawn('ls').then((buffer) => res.json(buffer.toString()))
})

module.exports = api
