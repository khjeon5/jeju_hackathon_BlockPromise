import { caver, getContractInstanceToken7, getContractInstanceProducts, getContractInstanceTrade, NFT } from './caver'

//const agContract = new caver.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS)

export default class KlaytnService {
  constructor() {
    //
  }

  async getProductInfo(tokenId) {
    const info = await getContractInstanceProducts()
      .methods.getProduct(tokenId)
      .call()
    return info
  }

  async saleProducts() {
    const allListIndex = await NFT.totalSupply()
    const list = []
    for (let i = 0; i < allListIndex; i++) {
      let imsi = await getContractInstanceProducts()
        .methods.getProduct(i + 1)
        .call()
      if (imsi[4] === true) {
        list.push(imsi)
      } else {
        continue
      }
    }
    return list
  }

  async getMySneakersList(adr) {
    const balance = await NFT.balanceOf(adr)
    const list = []
    for (let i = 0; i < balance; i++) {
      let imsi = await NFT.tokenOfOwnerByIndex(adr, i)
      let imsi2 = parseInt(imsi)
      let imsi3 = await getContractInstanceProducts()
        .methods.getProduct(imsi2)
        .call()
      list.push(imsi3)
    }
    return list
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
