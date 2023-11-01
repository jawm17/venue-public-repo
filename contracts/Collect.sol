// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// Interfaces, Libraries, Contracts
error NFTDepositContract__NotOwner();
error NFTDepositContract__InsufficientBalance();
error NFTDepositContract__TransferFailed();

contract Collect is ERC721 {
    string public TOKEN_URI =
        "ipfs://QmNaLF1AXgq1zmBAeipoVsRW6bcw4w8aax9tsFJbbgc1Ci";
    uint256 private s_tokenCounter;
    address private immutable i_owner;
    address private immutable i_creator;
    IERC20 private immutable i_usdcToken;
    mapping(uint256 => uint256) public s_TokenIdToBalance;

    uint256 public unlockPrice; // 10 USDC in wei
    uint256 public numGold;
    uint256 public creatorEarnings = 0;

    // Modifiers
    modifier onlyOwner() {
        if (msg.sender != i_owner) revert NFTDepositContract__NotOwner();
        _;
    }

    constructor(
        address usdcAddress,
        address creatorAddress,
        uint256 initialUnlockPrice,
        uint256 initialNumGold
    ) ERC721("unlock video", "LOCK") {
        s_tokenCounter = 0;
        i_owner = msg.sender;
        i_usdcToken = IERC20(usdcAddress);
        i_creator = creatorAddress;
        unlockPrice = initialUnlockPrice;
        numGold = initialNumGold;
    }

    function collect(address _to) public payable {
        require(
            i_usdcToken.transferFrom(msg.sender, address(this), unlockPrice),
            "USDC transfer failed"
        ); // transfer USDC from user to contract

        uint256 ownerShare = (unlockPrice * 60) / 100;
        uint256 tokenShare = (unlockPrice * 40) / 100;

        require(
            i_usdcToken.transfer(i_creator, ownerShare),
            "USDC transfer failed"
        ); // Transfer USDC to the creator

        // Distribute token share among all of the token IDs up to the first 100
        uint256 tokensToDistribute = (s_tokenCounter < numGold)
            ? s_tokenCounter
            : numGold;
        uint256 sharePerToken = tokenShare / tokensToDistribute;

        for (uint256 i = 0; i < tokensToDistribute; i++) {
            s_TokenIdToBalance[i] += sharePerToken;
        }

        _safeMint(_to, s_tokenCounter);
        s_tokenCounter++;
    }

    function claimRoyalties(uint256 _tokenId) public {
        uint256 tokenRoyalty = s_TokenIdToBalance[_tokenId];
        require(tokenRoyalty > 0, "No Royalties Available");

        require(
            i_usdcToken.transfer(ownerOf(_tokenId), tokenRoyalty),
            "USDC transfer failed"
        );
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        return TOKEN_URI;
    }
}
