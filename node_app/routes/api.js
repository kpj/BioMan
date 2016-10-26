const express = require('express')
const bodyParser = require('body-parser')
const spawn = require('spawn-promise')

let api = express.Router()
api.use(bodyParser.json())
api.use(bodyParser.urlencoded({extended: true}))

api.get('/nodes', (req, res) => {
  spawn('docker', ['node', 'ls'])
  .then(buffer => res.json({data: buffer.toString()}))
  .catch(reason => console.log(reason))
})

module.exports = api
