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

api.get('/registry', (req, res) => {
  spawn('curl', ['-s', 'http://localhost:5000/v2/_catalog'])
  .then(buffer => res.json({data: JSON.parse(buffer.toString())}))
})

module.exports = api
