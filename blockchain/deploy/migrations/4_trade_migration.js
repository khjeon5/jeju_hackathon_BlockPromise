const Trade = artifacts.require('Trade')
const fs = require("fs");

const token7Adr = fs.readFileSync('../KIP7TokenAddress', 'utf-8')
const token17Adr = fs.readFileSync('../ProductsAddress', 'utf-8')

module.exports = function (deployer) {
  deployer.deploy(Trade, token7Adr, token17Adr, token17Adr).then(() => {
    if (Trade._json) {
      fs.writeFile('TradeABI', JSON.stringify(Trade._json.abi, 2), (err) => {
        if (err) throw err
        console.log(`The abi of ${Trade._json.contractName} is recorded on deployedABI file`)
      })
    }
    fs.writeFile('TradeAddress', Trade.address, (err) => {
      if (err) throw err
      console.log(`The deployed contract address * ${Trade.address} * is recorded on deployedAddress file`)
    })
  })
}
