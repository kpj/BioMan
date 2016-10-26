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

api.post('/run/:image', (req, res) => {
  // TODO: make this dirty hack unnecessary
  let img = req.params.image.replace(/__/g, '/')
  console.log('Running', img)

  let name = 'bestserviceever'
  let cmd = []

  spawn('docker', [
    'service', 'create',
    '--replicas', 1,
    '--name', name,
    '--network', 'swarm_network',
    '--with-registry-auth',
    img, ...cmd])
  .then(buffer => res.json('service submitted'))
  .catch(reason => console.log(reason))
})

module.exports = api
