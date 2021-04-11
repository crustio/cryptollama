const CryptoLlama = artifacts.require('CryptoLlama')
const TOKENID = 0
module.exports = async callback => {
    const cnl = await CryptoLlama.deployed()
    console.log('Let\'s set the tokenURI of your characters')
    const tx = await cnl.setTokenURI(0, "https://ipfs.io/ipfs/QmYDqdEBfQQGLuMS2FovTBTtzm3Z5GKGYtupYwrTKarAVz?filename=the-white-cryptollama.json")
    const tx1 = await cnl.setTokenURI(1, "https://ipfs.io/ipfs/QmRZvhKLwe4YWmBxnVMLsVmgArtsd4Zw6dRWEZ5XpYtq6M?filename=the-pink-cryptollama.json")

    console.log(tx)
    callback(tx.tx)
}
