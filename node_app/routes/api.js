const fs = require('fs')

const express = require('express')
const bodyParser = require('body-parser')
const spawn = require('spawn-promise')
const uuid = require('uuid')
const fileUpload = require('express-fileupload')

const registryUrl = 'localhost:5000/'
let id_map = new Map()

let api = express.Router()
api.use(bodyParser.json())
api.use(bodyParser.urlencoded({ extended: true }))
api.use(fileUpload())

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
  let path = `${process.env.VOLUME}/${dir_id}/output`

  if (dir_id === undefined) {
    res.json({ data: [] })
    return
  }

  fs.readdir(path, (err, files) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.json({ data: files })
    }
  })
})

api.get('/files/:id/:file', (req, res) => {
  let cont_id = req.params.id
  let dir_id = id_map.get(cont_id)
  let fname = req.params.file
  let path = `${process.env.VOLUME}/${dir_id}/output/${fname}`

  if (dir_id === undefined) {
    res.status(500).json({ reason: 'Directory does not exist' })
  } else {
    res.download(path)
  }
})

api.post('/files/upload', (req, res) => {
  let path = `${process.env.VOLUME}/tmp_upload/`

  try {
    fs.statSync(path)
  } catch (e) {
    //console.log(e)
    fs.mkdirSync(path)
  }

  if (!req.files) {
    res.send('No files were uploaded.')
    return
  }

  let file = req.files.sampleFile
  file.mv(`${path}/${file.name}`, err => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.redirect('back')
    }
  })
})

api.post('/run/:image/:command', (req, res) => {
  let img = decodeURIComponent(req.params.image)
  let cmd = decodeURIComponent(req.params.command)

  let dir_id = uuid.v4()
  console.log('Running', `"${cmd}"`, 'in', img)

  let upl_path = `${process.env.VOLUME}/tmp_upload/`
  let inp_path = `${process.env.VOLUME}/${dir_id}/input`
  let out_path = `${process.env.VOLUME}/${dir_id}/output`

  fs.mkdirSync(`${process.env.VOLUME}/${dir_id}`)
  fs.mkdirSync(out_path)
  fs.renameSync(upl_path, inp_path)
  fs.mkdirSync(upl_path)

  spawn('docker', [
    'run', '-d',
    '-v', `${inp_path}:/input`,
    '-v', `${out_path}:/output`,
    img, 'sh', '-c', cmd])
  .then(buffer => {
    let cont_id = buffer.toString().replace('\n', '')
    id_map.set(cont_id, dir_id)
    res.json({data: cont_id})
  })
  .catch(reason => console.log(reason))
})

module.exports = api
