const Products = artifacts.require('Products')
const fs = require("fs");

const name = "ShoeBox Authenticated Sneakers"
const symbol = "SAS"


module.exports = function (deployer) {
  deployer.deploy(Products, name, symbol).then(() => {
    if (Products._json) {
      fs.writeFile('ProductsABI', JSON.stringify(Products._json.abi, 2), (err) => {
        if (err) throw err
        console.log(`The abi of ${Products._json.contractName} is recorded on deployedABI file`)
      })
    }
    fs.writeFile('ProductsAddress', Products.address, (err) => {
      if (err) throw err
      console.log(`The deployed contract address * ${Products.address} * is recorded on deployedAddress file`)
    })
  })
}
