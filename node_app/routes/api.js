const express = require('express')
const bodyParser = require('body-parser')
const spawn = require('spawn-promise')

const registryUrl = 'localhost:5000/'

let api = express.Router()
api.use(bodyParser.json())
api.use(bodyParser.urlencoded({ extended: true }))

api.get('/services', (req, res) => {
  spawn('docker', ['ps'])
  .then(buffer => res.json({ data: buffer.toString() }))
  .catch(reason => console.log(reason))
})

api.get('/registry', (req, res) => {
  spawn('curl', ['-s', `${registryUrl}v2/_catalog`])
  .then(buffer => res.json({ data: JSON.parse(buffer.toString()) }))
})

api.get('/logs/:id', (req, res) => {
  let id = req.params.id
  spawn('docker', ['logs', id])
  .then(buffer => res.json({ data: buffer.toString() }))
  .catch(reason => console.log(reason))
})

api.post('/run/:image/:command', (req, res) => {
  let img = decodeURIComponent(req.params.image)
  let cmd = decodeURIComponent(req.params.command)

  img = 'alpine'

  console.log('Running', `"${cmd}"`, 'in', img)

  spawn('docker', [
    'run', '-d',
    img, 'sh', '-c', cmd])
  .then(buffer => res.json({data: buffer.toString()}))
  .catch(reason => console.log(reason))
})

module.exports = api
