# Cryptollama 
### Location Based NFT AR Gaming App

#### Introduction
Welcome to our home page! We are building this Cryptollama game for Chainlink 2021 hackathon!

The app randomly generates locations to place Cryptollamas in AR. 
Player walks around the area to find the cryptollama.
 When found one, the player can tap the cryptollama and it will direct to the NFT token at opensea. 
 The player can make an offer to own the piece through opensea. 
 Cryptollamas come with different specialties and colors, which determines their value, are tradable between gamers.
 
 We use chainlink's VRF to dynamic generate the cryptollamas NFTs.

#### Project structure
* AR App: `ViroSample` (This is the only App that requires setup locally)
* Python API Server: `server` (This is deployed to Heroku, no need to setup)
* Cryptollama Dynamic NFT: `llama-nft`

### AR App setup

Please see [this README file.](ViroSample/README.md)
