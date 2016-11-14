const fs = require('fs')

const express = require('express')
const bodyParser = require('body-parser')
const spawn = require('spawn-promise')
const uuid = require('uuid')

const registryUrl = 'localhost:5000/'
let id_map = new Map()

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

api.get('/files/:id', (req, res) => {
  let cont_id = req.params.id
  let dir_id = id_map.get(cont_id)
  let path = `${process.env.VOLUME}/${dir_id}`

  /*spawn('docker', ['diff', id])
  .then(buffer => res.json({ data: buffer.toString() }))
  .catch(reason => console.log(reason))*/

  if (dir_id === undefined) {
    res.json({ data: [] })
    return
  }

  fs.readdir(path, (err, files) => {
    res.json({ data: files })
  })
})

api.get('/files/:id/:file', (req, res) => {
  let cont_id = req.params.id
  let dir_id = id_map.get(cont_id)
  let fname = req.params.file
  let path = `${process.env.VOLUME}/${dir_id}/${fname}`

  if (dir_id === undefined) {
    res.status(500).json({ reason: 'Directory does not exist' })
  } else {
    res.download(path)
  }
})

api.post('/run/:image/:command', (req, res) => {
  let img = decodeURIComponent(req.params.image)
  let cmd = decodeURIComponent(req.params.command)

  img = 'alpine'

  let dir_id = uuid.v4()
  console.log('Running', `"${cmd}"`, 'in', img)

  spawn('docker', [
    'run', '-d',
    '-v', `${process.env.VOLUME}/${dir_id}:/output`,
    img, 'sh', '-c', cmd])
  .then(buffer => {
    let cont_id = buffer.toString().replace('\n', '')
    id_map.set(cont_id, dir_id)
    res.json({data: cont_id})
  })
  .catch(reason => console.log(reason))
})

module.exports = api
