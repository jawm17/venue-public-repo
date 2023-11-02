# About Venue

Venue is a multi-media monetization platform. [venue.market](https://venue.market) allows creators to place their videos behind paywalls and receive tips for their work. Payments are made through the Polygon blockchain.

## Frontend Architecture 

Our React frontend codebase can be found in the [client folder](/client) above. 

## Backend Architecture

We use an Express server, Node, and MongoDB to listen to, interact with, and store data on the Polygon Proof of Stake blockchain. 
<br /> Inside of the `contracts` [folder](/contracts) we have the [USDC Deposit Contract](/contracts/USDCDeposit.sol). This is a basic contract written in solidity that allows us to integrate with our onramp payment partner, ThirdWeb. 
<br /> We also have the [Collect Contract](/contracts/Collect.sol) which is used to provide creators with an nft membership token referred to as a "Collectible". This contract includes a tier based royalty sharing system that is used for users on our site to invest in creators.  

## Future Development and Considerations

- Novel pricing mechanisms for locked videos. 
- Chat systems.
- Adjustable royalty rates for collect contracts.
- Pay with crypto.

## Feedback and Support

If you encounter an issue within venue.market, please send an e-mail to envy@nvus.io. All feedback is appreciated.
