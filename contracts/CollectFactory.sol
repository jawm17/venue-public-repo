// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "./Collect.sol"; // Assuming this is the path to your Collect contract

contract CollectFactory {
    address[] public deployedCollects;
    event ContractCreated(address newContractAddress);

    function createCollect(
        address usdcAddress,
        address creatorAddress,
        uint256 initialUnlockPrice,
        uint256 initialNumGold
    ) public returns (address) {
        Collect newCollect = new Collect(
            usdcAddress,
            creatorAddress,
            initialUnlockPrice,
            initialNumGold
        );
        deployedCollects.push(address(newCollect));
        emit ContractCreated(address(newCollect));
        return address(newCollect);
    }

    function getDeployedCollects() public view returns (address[] memory) {
        return deployedCollects;
    }
}
