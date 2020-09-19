import { caver, getContractInstanceToken7, getContractInstanceProducts, getContractInstanceTrade, NFT, FT } from './caver'

//const agContract = new caver.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS)

export default class KlaytnService {
  constructor() {
    //
  }

  async productEnrollConfirm(adr, seller, salePrice, productName, size) {
    await getContractInstanceProducts()
      .methods.enrollProduct(seller, salePrice, productName, size)
      .send({ from: adr, gas: 500000 })
      .then(function(receipt) {
        console.log(receipt)
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  async tradeConfirm(tokenId, adr) {
    await getContractInstanceProducts()
      .methods.confirmTrade(tokenId)
      .send({ from: adr, gas: 500000 })
      .then(function(receipt) {
        console.log(receipt)
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  async paidSneakers(adr) {
    const balance = await NFT.balanceOf(adr)
    const list = []
    for (let i = 0; i < balance; i++) {
      let imsi = await NFT.tokenOfOwnerByIndex(adr, i)
      let imsi2 = parseInt(imsi)
      let imsi3 = await getContractInstanceProducts()
        .methods.getProduct(imsi2)
        .call()
      let imsi4 = await getContractInstanceProducts()
        .methods.getIsPaid(imsi2)
        .call()
      if (imsi3[4] === true && imsi4 === true) {
        list.push(imsi3)
      }
    }
    return list
  }

  async payToken7(adr, amount, tokenId) {
    const tradeCA = '0x9eBd6322c3e23719F03b0076c34c03Cfe0cA9630'
    await getContractInstanceToken7()
      .methods.approve(tradeCA, amount)
      .send({ from: adr, gas: 500000 })
      .then(function(receipt) {
        console.log(receipt)
      })
      .catch(function(error) {
        console.log(error)
      })
    await getContractInstanceTrade()
      .methods.purchase(tokenId, amount)
      .send({ from: adr, gas: 500000 })
      .then(function(receipt) {
        console.log(receipt)
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  async keyringExpire(adr) {
    const a = caver.wallet.remove(adr)
    console.log(a)
  }

  async keyringSet(adr, priv) {
    const keyring = caver.wallet.keyring.create(adr, priv)
    await caver.wallet.add(keyring)
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
    const balance = await FT.balanceOf(address)
    return caver.utils.fromPeb(balance, 'KLAY')
  }
}
