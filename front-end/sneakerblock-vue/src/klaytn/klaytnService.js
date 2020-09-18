import { caver, getContractInstanceToken7, getContractInstanceProducts, getContractInstanceTrade } from './caver'

//const agContract = new caver.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS)

export default class KlaytnService {
  constructor() {
    //
  }

  async getKIP7Balance(adr) {
    const balance = await getContractInstanceToken7()
      .methods.balanceOf(adr)
      .call()
    return balance
  }

  async getKIP7Symbol() {
    const kip7Name = await getContractInstanceToken7()
      .methods.symbol()
      .call()
    return kip7Name
  }

  async getProductsName() {
    const productsName = await getContractInstanceProducts()
      .methods.name()
      .call()
    return productsName
  }

  async getMsgSenderTest() {
    const msgSender = await getContractInstanceTrade()
      .methods.msgSenderTest()
      .call()
    return msgSender
  }

  async getBlockNumber() {
    const blockNumber = await caver.klay.getBlockNumber()
    return blockNumber
  }

  async getBalance(address) {
    const balance = await caver.klay.getBalance(address)
    return caver.utils.fromPeb(balance, 'KLAY')
  }
}
