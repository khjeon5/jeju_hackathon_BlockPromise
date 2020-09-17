import Caver from 'caver-js'
import Web3 from 'web3'

const deployedABIToken7 = require('./deployedABIToken7.json')
const deployedABIToken17 = require('./deployedABIToken7.json')

const TEST_NET = 'https://api.baobab.klaytn.net:8651'
export const config = {
  rpcURL: TEST_NET,
}
const caver = new Caver(new Web3.providers.HttpProvider(config.rpcURL))

const DEPLOYED_ADDRESS_TOKEN7 = '0xD1Cb3cFC999d47A330D8f9792B30367f69F8e54b'
const DEPLOYED_ADDRESS_TOKEN17 = '0x0F3c4462f1c977dF3991e85b7913daF2A130c614'

const getContractInstanceToken7 = () => {
  const contractInstance = deployedABIToken7 && DEPLOYED_ADDRESS_TOKEN7 && new caver.klay.Contract(deployedABIToken7, DEPLOYED_ADDRESS_TOKEN7)
  return contractInstance
}
const getContractInstanceToken17 = () => {
  const contractInstance = deployedABIToken17 && DEPLOYED_ADDRESS_TOKEN17 && new caver.klay.Contract(deployedABIToken17, DEPLOYED_ADDRESS_TOKEN17)
  return contractInstance
}
export { caver, getContractInstanceToken7, getContractInstanceToken17 }
