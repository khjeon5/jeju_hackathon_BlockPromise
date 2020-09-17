const fs = require('fs')
const PrivateKeyConnector = require('connect-privkey-to-provider')
const NETWORK_ID = '1001'
const GASLIMIT = '8500000'
const URL = `https://api.baobab.klaytn.net:8651`
// const URL = `https://34.64.78.58:8551`
const PRIVATE_KEY = fs.readFileSync('./privateKey', 'utf8')
// const PRIVATE_KEY = '2cdba03f200bf7fbcce8973605393dfb9a698370d8a776c78e66ee2c315609b8'

module.exports = {
  networks: {
    klaytn: {
      provider: new PrivateKeyConnector(PRIVATE_KEY, URL),
      network_id: NETWORK_ID,
      gas: GASLIMIT,
      gasPrice: null,
    },
  },
  compilers: {
    solc: {
      version: '0.5.1',
    },
  },
}
