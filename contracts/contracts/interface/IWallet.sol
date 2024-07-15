// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

interface IWallet {
    function transferToken(
        address _tokenAddress,
        address _to,
        uint256 _amount
    ) external;

    function balanceOfToken(
        address tokenAddress
    ) external view returns (uint256);
}
