## about venue

venue is a multi-media monetization platform. [venue.market](https://venue.market) allows creators to place their videos behind paywalls and recieve tips for their work. Payments are made through the Polygon blockchain.

## frontend architecture 

Our React frontend codebase can be found in [client folder](/client) above. 

## backend architecture

We use an Express server, Node, and mongoDB to listen to, interact with, and store data on the Polygon Proof of Stake blockchain. Inside of the [contracts folder](/contracts) folder we have the [USDC Deposit Contract](/contracts/USDCDeposit.sol). This is a basic contract written in solidity that allows us to integrate with our onramp payment partner, ThirdWeb. We also have the [Collect Contract](/contracts/Collect.sol) which is used to provide creators with an nft membership token referred to as a "Collectible". This contract includes a tier based royalty sharing system that is used for users on our site to invest in creators.  

## future development and considerations

novel pricing mechanisms for locked videos. 
chat systems.
adjustable royalty rates for collect contracts.
pay with crypto.

## feedback and support

If you encounter an issue within venue.market, please send an e-mail to envy@nvus.io. All feedback is appreciated.
