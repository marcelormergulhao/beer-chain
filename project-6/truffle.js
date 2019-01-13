var HDWalletProvider = require("truffle-hdwallet-provider")

var mnemonic = "call exclude trend critic swear glad large wood diagram side prepare burst"

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/v3/aff8f794223f46c189754cbf6345a4b8')
      },
      network_id: '1',
      gas: 4500000,
      gasPrice: 10000000000,
    }
  }
};