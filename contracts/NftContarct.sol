// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract NftContarct is ERC721URIStorage, Pausable, Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;
    uint256 private _tokenIdCounter;

    struct NftType {
        uint256 tokenId;
        string category;
    }

    mapping(uint256 => NftType) public nftDetails;
    mapping(address => mapping(string => uint256)) public limitBalance;

    constructor(
        string memory name_,
        string memory symbol_,
        address owner
    ) ERC721(name_, symbol_) Ownable(owner) {}

    function pause() public onlyOwner whenNotPaused {
        _pause();
    }
    function unPause() public onlyOwner whenPaused {
        _unpause();
    }

    function mintNft(
        address recipient,
        string memory category,
        string memory tokenURI
    ) public nonReentrant whenNotPaused returns (uint256) {
        require(recipient != address(0), "Invalid Address");

        uint256 newTokenId = _tokenIdCounter++;
        nftDetails[newTokenId] = NftType({
            tokenId: newTokenId,
            category: category
        });
        _mint(recipient, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        return newTokenId;
    }

    function transfer(
        uint256 tokenId,
        address recipient
    ) public nonReentrant whenNotPaused {
        require(msg.sender == ownerOf(tokenId), "Invalid owner");
        super._transfer(msg.sender, recipient, tokenId);
        limitBalance[msg.sender][nftDetails[tokenId].category]--;
        limitBalance[recipient][nftDetails[tokenId].category]++;
    }
}
