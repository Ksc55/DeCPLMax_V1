// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "./NftContarct.sol";

contract NftFactory {
    mapping(address => address) public usernameToNftCollectionAddress;

    error CollectionExist();

    event CollectionCreated(
        address indexed collectionAddress,
        address indexed collectionOwner
    );

    function createCollection(
        string memory name_,
        string memory symbol_
    ) public {
        if (usernameToNftCollectionAddress[msg.sender] != address(0)) {
            revert CollectionExist();
        }
        NftContarct nftContarct = new NftContarct(name_, symbol_, msg.sender);
        usernameToNftCollectionAddress[msg.sender] = address(nftContarct);
        emit CollectionCreated(address(nftContarct), msg.sender);
    }
}
