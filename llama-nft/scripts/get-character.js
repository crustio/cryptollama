const CryptoLlama = artifacts.require('CryptoLlama')

module.exports = async callback => {
    const cnl = await CryptoLlama.deployed()
    console.log('Let\'s get the overview of your character')
    const overview = await cnl.characters(0)
    console.log(overview)
    callback(overview.tx)
}
