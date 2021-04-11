const CryptoLlama = artifacts.require('CryptoLlama')

module.exports = async callback => {
    const cnl = await CryptoLlama.deployed()
    console.log('Creating requests on contract:', cnl.address)
    const tx = await cnl.requestNewRandomCharacter(77, "The White CryptoLlama")
    const tx2 = await cnl.requestNewRandomCharacter(7777777, "The Pink CryptoLlama")
    callback(tx.tx)
}
