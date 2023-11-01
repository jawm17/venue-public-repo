// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// Interfaces, Libraries, Contracts
error NFTDepositContract__NotOwner();
error NFTDepositContract__InsufficientBalance();
error NFTDepositContract__TransferFailed();

contract USDCDeposit is ERC721 {
    string public constant TOKEN_URI =
        "ipfs://QmNaLF1AXgq1zmBAeipoVsRW6bcw4w8aax9tsFJbbgc1Ci";
    uint256 private s_tokenCounter;
    uint256 private s_depositFee;
    uint256 private s_transferFee;
    uint256 private s_feesGenerated;
    address private immutable i_owner;
    IERC20 private immutable i_usdcToken;
    mapping(address => uint256) public s_AdressToBalance;

    // Events
    event tokenTransfer(
        uint256 indexed amount,
        address indexed sender,
        address indexed recipient
    );
    event tokenWithdrawal(
        uint256 indexed amount,
        address indexed sender,
        address indexed recipient
    );
    event tokenDeposit(
        address indexed recipient,
        uint256 indexed amount
    );
    event TransferFeeSet(uint256 indexed fee);

    // Modifiers
    modifier onlyOwner() {
        if (msg.sender != i_owner) revert NFTDepositContract__NotOwner();
        _;
    }

    constructor(
        uint256 transferFee,
        address usdcAddress
    ) ERC721("Venue Deposit Receipt", "VENUE") {
        s_tokenCounter = 0;
        s_transferFee = transferFee;
        i_usdcToken = IERC20(usdcAddress); // 0x07865c6E87B9F70255377e024ace6630C1Eaa37F
        i_owner = msg.sender;
        // add function to update owner
    }

    function depositTokens(address _to, uint256 _amount) public payable {
        require(
            i_usdcToken.transferFrom(msg.sender, address(this), _amount),
            "USDC transfer failed"
        ); // transfer USDC from user to contract
        _safeMint(_to, s_tokenCounter);
        s_AdressToBalance[_to] += _amount;
        s_tokenCounter = s_tokenCounter + 1;
        emit tokenDeposit(_to, _amount);
    }

    function transferTokens(
        uint256 amount,
        address sender,
        address recipient
    ) public onlyOwner {
        // require owner of tokenId === sender ??
        require(amount > 0, "Send Value Too Low");
        if (s_AdressToBalance[sender] < amount) {
            revert NFTDepositContract__InsufficientBalance();
        }
        uint256 fee = (amount * s_transferFee) / 100;
        uint256 amountMinusFee = amount - fee;
        s_AdressToBalance[sender] -= amount;
        s_feesGenerated += fee;
        s_AdressToBalance[recipient] += amountMinusFee;
        emit tokenTransfer(amount, sender, recipient);
    }

    function withdrawTokens(
        uint256 amount,
        address sender,
        address recipient
    ) public onlyOwner {
        // require owner of tokenId === sender ??
        require(amount > 0, "Send Value Too Low");
        if (s_AdressToBalance[sender] < amount) {
            revert NFTDepositContract__InsufficientBalance();
        }
        s_AdressToBalance[sender] -= amount;
        require(
            i_usdcToken.transfer(recipient, amount),
            "USDC transfer failed"
        );
        emit tokenWithdrawal(amount, sender, recipient);
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

    function withdrawFees() public onlyOwner {
        require(s_feesGenerated > 0, "No Fees Generated");
        s_feesGenerated = 0;
        require(
            i_usdcToken.transfer(msg.sender, s_feesGenerated),
            "USDC transfer failed"
        );
    }

    function getUSDCBal() public view returns (uint256) {
        return i_usdcToken.balanceOf(address(this));
    }

    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }

    function getAddressBalance(
        address addressToCheck
    ) public view returns (uint256) {
        return s_AdressToBalance[addressToCheck];
    }

    function getTransferFee() public view returns (uint256) {
        return s_transferFee;
    }

    function setTransferFee(uint256 transferFee) public onlyOwner {
        s_transferFee = transferFee;
        emit TransferFeeSet(transferFee);
    }

    function getFeesGenerated() public view returns (uint256) {
        return s_feesGenerated;
    }
}
