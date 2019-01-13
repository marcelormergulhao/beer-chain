# Project 6 - Architect a Blockchain Supply Chain Solution - Part B

The project represents a simple supply chain for beers, going from hops and barley
harvest in farms until the final consumer buying the product from a supermarket.

## UML

The UML diagrams that describe this solution are in the diagramsPartB.zip file.
They were slightly changed from the diagrams submited on part A to better represent
the interaction between parts (specially the selling, buying and shipping phases).

## Libraries and IPFS

This project used the libraries provided with the StarterCode and one for deployment on rinkeby:

* Web3js: used to interact with Ethereum on web apps.
* truffle-contract.js: provides a higher level of abstraction to smart contracts.
* HDWalletProvider: to use your specific account for contract deployment

To install HDWallet provider just run `npm install truffle-hdwallet-provider".
Also, no IPFS was used.

## Versions

* Truffle v4.1.14 (core: 4.1.14)
* Solidity v0.4.24 (solc-js)
* Web3 v0.20.3

## Contract Information

The contract was deployed to address 0x83d4728fbb0D931dD40c88F25E7D756130F1226b.
The transaction ID is 0x44d2c4fcaeb37de870f5c1bf5cd5ebb6a72f0e82d56a680a37e12a1a446ba246.