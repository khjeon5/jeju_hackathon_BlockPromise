const KIP7Token = artifacts.require('KIP7Token')
const fs = require("fs");

const name = "Crypto South Korean Won"
const symbol = "XKRW"
const decimals = "0"
const initialSupply = "10000000000000000000"


module.exports = function (deployer) {
  deployer.deploy(KIP7Token, name, symbol, decimals, initialSupply).then(() => {
    if (KIP7Token._json) {
      fs.writeFile('KIP7TokenABI', JSON.stringify(KIP7Token._json.abi, 2), (err) => {
        if (err) throw err
        console.log(`The abi of ${KIP7Token._json.contractName} is recorded on deployedABI file`)
      })
    }
    fs.writeFile('KIP7TokenAddress', KIP7Token.address, (err) => {
      if (err) throw err
      console.log(`The deployed contract address * ${KIP7Token.address} * is recorded on deployedAddress file`)
    })
  })
}
