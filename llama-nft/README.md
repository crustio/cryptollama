# llama-nft smart contracts
### Set up 

#### Get Rinkeby Testnet ETH and Testnet LINK from Faucet
* [Rinkeby Testnet ETH](https://faucet.rinkeby.io/)
* [Rinkeby Testnet LINK](https://rinkeby.chain.link/)

#### Set env variables in bash_profile
```
export MNEMONIC='cat dog frog....'
export RINKEBY_RPC_URL='www.infura.io/asdfadsfafdadf'
```

#### Migrate contracts
```
npm install
truffle migrate --reset --network rinkeby
```

#### Generate llamas

```
truffle exec scripts/fund-contract.js --network rinkeby
truffle exec scripts/generate-character.js --network rinkeby
truffle exec scripts/get-character.js --network rinkeby
```

#### See on etherscan

Get [Etherscan API Key](https://etherscan.io/apis) and set `ETHERSCAN_API_KEY` as env var

```shell script
npm install truffle-plugin-verify
truffle run verify CryptoLlama --network rinkeby --license MIT
```

This is the [contract](https://rinkeby.etherscan.io/address/0x8ec2877A04570f6f7AF4dC02b18197e8C74E5d20#contracts)


#### Create metadata for NFT

```shell script
mkdir metadata
truffle exec scripts/create-metadata.js --network rinkeby 
```

Then upload `metadata` folder to ipfs and retrieve the ipfs link of the metadata files and set to `set-token-uri.js`

#### Set Token URI for ERC721
```shell script
truffle exec scripts/set-token-uri.js --network rinkeby
```

#### See it in OpenSea!

* [The White CryptoLlama](https://testnets.opensea.io/assets/0x8ec2877a04570f6f7af4dc02b18197e8c74e5d20/0)
* [The Pink CryptoLlama](https://testnets.opensea.io/assets/0x8ec2877a04570f6f7af4dc02b18197e8c74e5d20/1)
