import Caver from 'caver-js'
import Web3 from 'web3'

const deployedABIToken7 = require('./KIP7TokenABI.json')
const deployedABIProducts = require('./ProductsABI.json')
const deployedABITrade = require('./TradeABI.json')

const TEST_NET = 'https://api.baobab.klaytn.net:8651'
export const config = {
  rpcURL: TEST_NET,
}
const caver = new Caver(new Web3.providers.HttpProvider(config.rpcURL))

const DEPLOYED_ADDRESS_TOKEN7 = '0x8C6dB9F1731f00aA262aaD3a969B9f965d426E07'
const DEPLOYED_ADDRESS_PRODUCTS = '0x7bcceb4B76f75F99ab02641adAE4e066ecb0d0cD'
const DEPLOYED_ADDRESS_TRADE = '0x9eBd6322c3e23719F03b0076c34c03Cfe0cA9630'

const NFT = new caver.klay.KIP17(DEPLOYED_ADDRESS_PRODUCTS)

const getContractInstanceToken7 = () => {
  const contractInstance = deployedABIToken7 && DEPLOYED_ADDRESS_TOKEN7 && new caver.klay.Contract(deployedABIToken7, DEPLOYED_ADDRESS_TOKEN7)
  return contractInstance
}

const getContractInstanceProducts = () => {
  const contractInstance = deployedABIProducts && DEPLOYED_ADDRESS_PRODUCTS && new caver.klay.Contract(deployedABIProducts, DEPLOYED_ADDRESS_PRODUCTS)
  return contractInstance
}

const getContractInstanceTrade = () => {
  const contractInstance = deployedABITrade && DEPLOYED_ADDRESS_TRADE && new caver.klay.Contract(deployedABITrade, DEPLOYED_ADDRESS_TRADE)
  return contractInstance
}

export { caver, getContractInstanceToken7, getContractInstanceProducts, getContractInstanceTrade, NFT }
