const express = require('express')
const app = express()
const Caver = require('caver-js')

let host = 'localhost'
let port = 3100
let path = 'node'

// const caver = new Caver('https://api.baobab.klaytn.net:8651/')

const accessKeyId = "";
const secretAccessKey = "";

const option = {
  headers: [
    { name: 'Authorization', value: 'Basic ' + Buffer.from(accessKeyId + ':' + secretAccessKey).toString('base64') },
    { name: 'x-chain-id', value: 1001 },
  ]
}

app.get('/', (req, res) => {
  res.send('Hello NodeAPI')
})

app.get(`/${path}`, (req, res) => {

  const caver = new Caver(new Caver.providers.HttpProvider("https://node-api.klaytnapi.com/v1/klaytn", option))

  async function asd() {
    const a = await caver.rpc.klay.getBlockNumber()
    console.log(a)
  }
  asd()

})

app.listen(port, (req, res) => {
  console.log(`http://${host}:${port}/${path}`)
})