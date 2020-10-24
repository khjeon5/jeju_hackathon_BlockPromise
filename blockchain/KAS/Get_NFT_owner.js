const axios = require('axios')
const express = require('express')
const app = express()

let host = 'localhost'
let port = 3030
let baobobChainId = 1001

app.get('/', (req, res) => {
    let nftAddress = '0x7bcceb4B76f75F99ab02641adAE4e066ecb0d0cD'
    let reqtokenId = req.query.tokenId //16진수
    let tokenId = Number(reqtokenId).toString(16)
    console.log(reqtokenId)
    console.log(tokenId)

    const kasConfig = {
        accessKeyId: 'KASKBRUEBAB3Z2DHX184QX8F',
        secretAccessKey: 'CO+OjMu0GBT3OrI7ct6jsB5uI8N3N4Uqo0UVNN/a',
        host_url: 'https://th-api.klaytnapi.com'
    }

    const credential = Buffer.from(`${kasConfig.accessKeyId}:${kasConfig.secretAccessKey}`).toString("base64");
    let endPoint = `/v2/contract/nft/${nftAddress}/token/0x${tokenId}/history`


    let url = kasConfig.host_url + endPoint
    let headers = {
        "Authorization": `Basic ${credential}`,
        "Content-Type": "application/json",
        "x-chain-id": `${baobobChainId}`, 
    }

    axios.get(url, {
        headers: headers, param :{
            size : 100
        }
    }).then((response) => {
        console.log('URL: ', url)
        let result = response['data']['items'][0]['to']
        // let result_2 = response['data']['items'][1]['to']
        let owner = new Array(result)
        console.log(`Success : ${owner}`)
        console.log(owner)
        res.send(owner)
    }).then(function (err) {
        if (err) {
            console.error("error: " + err)
        }
    })
})

app.listen(port, (req, res) => {
    console.log(`http:${host}:${port}`)
})