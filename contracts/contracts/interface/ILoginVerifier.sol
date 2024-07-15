// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

interface ILoginVerifier {
    function verifyLogin(
        uint[2] calldata _pA,
        uint[2][2] calldata _pB,
        uint[2] calldata _pC,
        uint[1] calldata _pubSignals,
        string calldata _userName
    ) external;

    function changePassword(
        uint[2] calldata _pA,
        uint[2][2] calldata _pB,
        uint[2] calldata _pC,
        uint[1] calldata _pubSignals,
        string calldata _userName,
        bytes32 _oldPHash,
        bytes32 _newPHash
    ) external;

    function registerUser(
        bytes32 _pHash,
        bytes32 _bHash,
        string memory _userName
    ) external;
}
