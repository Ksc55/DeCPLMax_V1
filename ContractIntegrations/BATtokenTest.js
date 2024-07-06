require('isomorphic-fetch');
const BigNumber = require('bignumber.js');
const thetajs = require('@thetalabs/theta-js');
const Wallet = thetajs.Wallet;
const { HttpProvider } = thetajs.providers;
const Contract = thetajs.Contract;
const ContractFactory = thetajs.ContractFactory;
const { ChainIds } = thetajs.networks;

// ***** IMPORTANT: replace with the addresses and private keys for your test *****
const AddressAdmin = "ADMIN_WALLET_ADDRESS";
const AddressUser1 = "USER_1_WALLET_ADDRESS";
const AddressUser2 = "USER_2_WALLET_ADDRESS";
const PrivateKeyAdmin = "ADMIN_WALLET_PRIVATE_KEY";
const PrivateKeyUser1 = "USER_1_WALLET_PRIVATE_KEY";
const PrivateKeyUser2 = "USER_2_WALLET_PRIVATE_KEY";

var provider = new HttpProvider(ChainIds.Testnet);
var walletAdmin = new Wallet(PrivateKeyAdmin, provider);
var walletUser1 = new Wallet(PrivateKeyUser1, provider);
var walletUser2 = new Wallet(PrivateKeyUser2, provider);

// Contract ABI and Bytecode (replace with the actual ABI and Bytecode of BATToken)
const BATTokenABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "allowance",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "needed",
            "type": "uint256"
          }
        ],
        "name": "ERC20InsufficientAllowance",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "balance",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "needed",
            "type": "uint256"
          }
        ],
        "name": "ERC20InsufficientBalance",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "approver",
            "type": "address"
          }
        ],
        "name": "ERC20InvalidApprover",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "receiver",
            "type": "address"
          }
        ],
        "name": "ERC20InvalidReceiver",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "sender",
            "type": "address"
          }
        ],
        "name": "ERC20InvalidSender",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          }
        ],
        "name": "ERC20InvalidSpender",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "OwnableInvalidOwner",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "OwnableUnauthorizedAccount",
        "type": "error"
      },
      {
        "inputs": [],
        "name": "ReentrancyGuardReentrantCall",
        "type": "error"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "Approval",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "BATMinted",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "previousOwner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "scoreType",
            "type": "string"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "score",
            "type": "uint256"
          }
        ],
        "name": "ScoreUpdated",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "Transfer",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          }
        ],
        "name": "allowance",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "approve",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "burnBAT",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "contributionScores",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "decimals",
        "outputs": [
          {
            "internalType": "uint8",
            "name": "",
            "type": "uint8"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "engagementScores",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "leadGenerationScores",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "user",
            "type": "address"
          }
        ],
        "name": "mintBAT",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "name",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "referralScores",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "score",
            "type": "uint256"
          }
        ],
        "name": "setContributionScore",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "score",
            "type": "uint256"
          }
        ],
        "name": "setEngagementScore",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "score",
            "type": "uint256"
          }
        ],
        "name": "setLeadGenerationScore",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "score",
            "type": "uint256"
          }
        ],
        "name": "setReferralScore",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "score",
            "type": "uint256"
          }
        ],
        "name": "setViewScore",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "symbol",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "transfer",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "recipient",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "transferBAT",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "transferFrom",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "viewScores",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
];

const BATTokenByteCode = {
    "bytecode": "0x60806040523480156200001157600080fd5b50336040518060400160405280601e81526020017f446563706c6d617820426173696320417474656e74696f6e20546f6b656e00008152506040518060400160405280600b81526020016a111958dc1b1b585e10905560aa1b81525081600390816200007e919062000368565b5060046200008d828262000368565b5050506001600160a01b038116620000c057604051631e4fbdf760e01b8152600060048201526024015b60405180910390fd5b620000cb8162000100565b506001600655620000fa33620000e46012600a62000549565b620000f4906305f5e10062000561565b62000152565b62000591565b600580546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6001600160a01b0382166200017e5760405163ec442f0560e01b815260006004820152602401620000b7565b6200018c6000838362000190565b5050565b6001600160a01b038316620001bf578060026000828254620001b391906200057b565b90915550620002339050565b6001600160a01b03831660009081526020819052604090205481811015620002145760405163391434e360e21b81526001600160a01b03851660048201526024810182905260448101839052606401620000b7565b6001600160a01b03841660009081526020819052604090209082900390555b6001600160a01b038216620002515760028054829003905562000270565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051620002b691815260200190565b60405180910390a3505050565b634e487b7160e01b600052604160045260246000fd5b600181811c90821680620002ee57607f821691505b6020821081036200030f57634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200036357600081815260208120601f850160051c810160208610156200033e5750805b601f850160051c820191505b818110156200035f578281556001016200034a565b5050505b505050565b81516001600160401b03811115620003845762000384620002c3565b6200039c81620003958454620002d9565b8462000315565b602080601f831160018114620003d45760008415620003bb5750858301515b600019600386901b1c1916600185901b1785556200035f565b600085815260208120601f198616915b828110156200040557888601518255948401946001909101908401620003e4565b5085821015620004245787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b634e487b7160e01b600052601160045260246000fd5b600181815b808511156200048b5781600019048211156200046f576200046f62000434565b808516156200047d57918102915b93841c93908002906200044f565b509250929050565b600082620004a45750600162000543565b81620004b35750600062000543565b8160018114620004cc5760028114620004d757620004f7565b600191505062000543565b60ff841115620004eb57620004eb62000434565b50506001821b62000543565b5060208310610133831016604e8410600b84101617156200051c575081810a62000543565b6200052883836200044a565b80600019048211156200053f576200053f62000434565b0290505b92915050565b60006200055a60ff84168362000493565b9392505050565b808202811582820484141762000543576200054362000434565b8082018082111562000543576200054362000434565b61109180620005a16000396000f3fe608060405234801561001057600080fd5b50600436106101735760003560e01c8063715018a6116100de578063a9059cbb11610097578063dd62ed3e11610071578063dd62ed3e1461035b578063e393f85814610394578063f2fde38b146103b4578063fe25d770146103c757600080fd5b8063a9059cbb14610322578063acb9b7a514610335578063ad7e34b41461034857600080fd5b8063715018a6146102b157806378dcb2da146102b95780638da5cb5b146102d957806395d89b41146102f45780639f818a51146102fc578063a2ee903f1461030f57600080fd5b8063313ce56711610130578063313ce5671461021357806342b79d90146102225780634bcf965a146102425780635656594f146102555780636c55b0a71461026857806370a082311461028857600080fd5b806306fdde0314610178578063095ea7b31461019657806318160ddd146101b95780631d4cb3ba146101cb57806323b872dd146101e057806324874a15146101f3575b600080fd5b6101806103da565b60405161018d9190610d67565b60405180910390f35b6101a96101a4366004610dd1565b61046c565b604051901515815260200161018d565b6002545b60405190815260200161018d565b6101de6101d9366004610dd1565b610486565b005b6101a96101ee366004610dfb565b610524565b6101bd610201366004610e37565b60096020526000908152604090205481565b6040516012815260200161018d565b6101bd610230366004610e37565b60076020526000908152604090205481565b6101de610250366004610e59565b610548565b6101de610263366004610dd1565b610555565b6101bd610276366004610e37565b600b6020526000908152604090205481565b6101bd610296366004610e37565b6001600160a01b031660009081526020819052604090205490565b6101de610564565b6101bd6102c7366004610e37565b600a6020526000908152604090205481565b6005546040516001600160a01b03909116815260200161018d565b610180610578565b6101de61030a366004610dd1565b610587565b6101de61031d366004610dd1565b610618565b6101a9610330366004610dd1565b61069e565b6101de610343366004610dd1565b6106ac565b6101de610356366004610dd1565b610734565b6101bd610369366004610e72565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6101bd6103a2366004610e37565b60086020526000908152604090205481565b6101de6103c2366004610e37565b6107c2565b6101de6103d5366004610e37565b6107fd565b6060600380546103e990610ea5565b80601f016020809104026020016040519081016040528092919081815260200182805461041590610ea5565b80156104625780601f1061043757610100808354040283529160200191610462565b820191906000526020600020905b81548152906001019060200180831161044557829003601f168201915b5050505050905090565b60003361047a818585610964565b60019150505b92915050565b61048e610976565b816001600160a01b0381166104be5760405162461bcd60e51b81526004016104b590610edf565b60405180910390fd5b6001600160a01b0383166000818152600760209081526040918290208590558151828152600a9281019290925269115b99d859d95b595b9d60b21b6060830152810184905260008051602061103c833981519152906080015b60405180910390a2505050565b6000336105328582856109a3565b61053d858585610a21565b506001949350505050565b6105523382610a80565b50565b610560338383610a21565b5050565b61056c610976565b6105766000610ab6565b565b6060600480546103e990610ea5565b61058f610976565b816001600160a01b0381166105b65760405162461bcd60e51b81526004016104b590610edf565b6001600160a01b0383166000818152600960209081526040918290208590558151828152600f928101929092526e2632b0b21023b2b732b930ba34b7b760891b6060830152810184905260008051602061103c83398151915290608001610517565b610620610976565b816001600160a01b0381166106475760405162461bcd60e51b81526004016104b590610edf565b6001600160a01b0383166000818152600a60209081526040918290208590558151828152600492810192909252635669657760e01b6060830152810184905260008051602061103c83398151915290608001610517565b60003361047a818585610a21565b6106b4610976565b816001600160a01b0381166106db5760405162461bcd60e51b81526004016104b590610edf565b6001600160a01b03831660008181526008602081815260409283902086905582518381529283019190915267149959995c9c985b60c21b6060830152810184905260008051602061103c83398151915290608001610517565b61073c610976565b816001600160a01b0381166107635760405162461bcd60e51b81526004016104b590610edf565b6001600160a01b0383166000818152600b60209081526040918290208590558151828152600c928101929092526b21b7b73a3934b13aba34b7b760a11b6060830152810184905260008051602061103c83398151915290608001610517565b6107ca610976565b6001600160a01b0381166107f457604051631e4fbdf760e01b8152600060048201526024016104b5565b61055281610ab6565b610805610976565b61080d610b08565b806001600160a01b0381166108345760405162461bcd60e51b81526004016104b590610edf565b6001600160a01b0382166000908152600b6020908152604080832054600a8352818420546009845282852054600885528386205460079095529285205491939092916108809190610f1e565b61088a9190610f1e565b6108949190610f1e565b61089e9190610f1e565b9050600081116108f05760405162461bcd60e51b815260206004820152601f60248201527f5573657220686173206e6f2073636f72657320746f206d696e74204241542e0060448201526064016104b5565b60006108fe6012600a611015565b6109089083611024565b90506109148482610b32565b836001600160a01b03167feabc78801c3b6a33c6ec6981d5375a09195842cd1139c227d8a162aa01fd612a8260405161094f91815260200190565b60405180910390a25050506105526001600655565b6109718383836001610b68565b505050565b6005546001600160a01b031633146105765760405163118cdaa760e01b81523360048201526024016104b5565b6001600160a01b038381166000908152600160209081526040808320938616835292905220546000198114610a1b5781811015610a0c57604051637dc7a0d960e11b81526001600160a01b038416600482015260248101829052604481018390526064016104b5565b610a1b84848484036000610b68565b50505050565b6001600160a01b038316610a4b57604051634b637e8f60e11b8152600060048201526024016104b5565b6001600160a01b038216610a755760405163ec442f0560e01b8152600060048201526024016104b5565b610971838383610c3d565b6001600160a01b038216610aaa57604051634b637e8f60e11b8152600060048201526024016104b5565b61056082600083610c3d565b600580546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600260065403610b2b57604051633ee5aeb560e01b815260040160405180910390fd5b6002600655565b6001600160a01b038216610b5c5760405163ec442f0560e01b8152600060048201526024016104b5565b61056060008383610c3d565b6001600160a01b038416610b925760405163e602df0560e01b8152600060048201526024016104b5565b6001600160a01b038316610bbc57604051634a1406b160e11b8152600060048201526024016104b5565b6001600160a01b0380851660009081526001602090815260408083209387168352929052208290558015610a1b57826001600160a01b0316846001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92584604051610c2f91815260200190565b60405180910390a350505050565b6001600160a01b038316610c68578060026000828254610c5d9190610f1e565b90915550610cda9050565b6001600160a01b03831660009081526020819052604090205481811015610cbb5760405163391434e360e21b81526001600160a01b038516600482015260248101829052604481018390526064016104b5565b6001600160a01b03841660009081526020819052604090209082900390555b6001600160a01b038216610cf657600280548290039055610d15565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610d5a91815260200190565b60405180910390a3505050565b600060208083528351808285015260005b81811015610d9457858101830151858201604001528201610d78565b506000604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b0381168114610dcc57600080fd5b919050565b60008060408385031215610de457600080fd5b610ded83610db5565b946020939093013593505050565b600080600060608486031215610e1057600080fd5b610e1984610db5565b9250610e2760208501610db5565b9150604084013590509250925092565b600060208284031215610e4957600080fd5b610e5282610db5565b9392505050565b600060208284031215610e6b57600080fd5b5035919050565b60008060408385031215610e8557600080fd5b610e8e83610db5565b9150610e9c60208401610db5565b90509250929050565b600181811c90821680610eb957607f821691505b602082108103610ed957634e487b7160e01b600052602260045260246000fd5b50919050565b6020808252600f908201526e496e76616c6964206164647265737360881b604082015260600190565b634e487b7160e01b600052601160045260246000fd5b8082018082111561048057610480610f08565b600181815b80851115610f6c578160001904821115610f5257610f52610f08565b80851615610f5f57918102915b93841c9390800290610f36565b509250929050565b600082610f8357506001610480565b81610f9057506000610480565b8160018114610fa65760028114610fb057610fcc565b6001915050610480565b60ff841115610fc157610fc1610f08565b50506001821b610480565b5060208310610133831016604e8410600b8410161715610fef575081810a610480565b610ff98383610f31565b806000190482111561100d5761100d610f08565b029392505050565b6000610e5260ff841683610f74565b808202811582820484141761048057610480610f0856fe0e9ea3aaf35cf9e8897643a4d5240fd604debe73361d1917894c1cbad6d01c15a26469706673582212209318017b0d1f4e42d54ffc93c76b8fd4ed1f023712116d151e1ba2545fa0698764736f6c63430008140033",
    "deployedBytecode": "0x608060405234801561001057600080fd5b50600436106101735760003560e01c8063715018a6116100de578063a9059cbb11610097578063dd62ed3e11610071578063dd62ed3e1461035b578063e393f85814610394578063f2fde38b146103b4578063fe25d770146103c757600080fd5b8063a9059cbb14610322578063acb9b7a514610335578063ad7e34b41461034857600080fd5b8063715018a6146102b157806378dcb2da146102b95780638da5cb5b146102d957806395d89b41146102f45780639f818a51146102fc578063a2ee903f1461030f57600080fd5b8063313ce56711610130578063313ce5671461021357806342b79d90146102225780634bcf965a146102425780635656594f146102555780636c55b0a71461026857806370a082311461028857600080fd5b806306fdde0314610178578063095ea7b31461019657806318160ddd146101b95780631d4cb3ba146101cb57806323b872dd146101e057806324874a15146101f3575b600080fd5b6101806103da565b60405161018d9190610d67565b60405180910390f35b6101a96101a4366004610dd1565b61046c565b604051901515815260200161018d565b6002545b60405190815260200161018d565b6101de6101d9366004610dd1565b610486565b005b6101a96101ee366004610dfb565b610524565b6101bd610201366004610e37565b60096020526000908152604090205481565b6040516012815260200161018d565b6101bd610230366004610e37565b60076020526000908152604090205481565b6101de610250366004610e59565b610548565b6101de610263366004610dd1565b610555565b6101bd610276366004610e37565b600b6020526000908152604090205481565b6101bd610296366004610e37565b6001600160a01b031660009081526020819052604090205490565b6101de610564565b6101bd6102c7366004610e37565b600a6020526000908152604090205481565b6005546040516001600160a01b03909116815260200161018d565b610180610578565b6101de61030a366004610dd1565b610587565b6101de61031d366004610dd1565b610618565b6101a9610330366004610dd1565b61069e565b6101de610343366004610dd1565b6106ac565b6101de610356366004610dd1565b610734565b6101bd610369366004610e72565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6101bd6103a2366004610e37565b60086020526000908152604090205481565b6101de6103c2366004610e37565b6107c2565b6101de6103d5366004610e37565b6107fd565b6060600380546103e990610ea5565b80601f016020809104026020016040519081016040528092919081815260200182805461041590610ea5565b80156104625780601f1061043757610100808354040283529160200191610462565b820191906000526020600020905b81548152906001019060200180831161044557829003601f168201915b5050505050905090565b60003361047a818585610964565b60019150505b92915050565b61048e610976565b816001600160a01b0381166104be5760405162461bcd60e51b81526004016104b590610edf565b60405180910390fd5b6001600160a01b0383166000818152600760209081526040918290208590558151828152600a9281019290925269115b99d859d95b595b9d60b21b6060830152810184905260008051602061103c833981519152906080015b60405180910390a2505050565b6000336105328582856109a3565b61053d858585610a21565b506001949350505050565b6105523382610a80565b50565b610560338383610a21565b5050565b61056c610976565b6105766000610ab6565b565b6060600480546103e990610ea5565b61058f610976565b816001600160a01b0381166105b65760405162461bcd60e51b81526004016104b590610edf565b6001600160a01b0383166000818152600960209081526040918290208590558151828152600f928101929092526e2632b0b21023b2b732b930ba34b7b760891b6060830152810184905260008051602061103c83398151915290608001610517565b610620610976565b816001600160a01b0381166106475760405162461bcd60e51b81526004016104b590610edf565b6001600160a01b0383166000818152600a60209081526040918290208590558151828152600492810192909252635669657760e01b6060830152810184905260008051602061103c83398151915290608001610517565b60003361047a818585610a21565b6106b4610976565b816001600160a01b0381166106db5760405162461bcd60e51b81526004016104b590610edf565b6001600160a01b03831660008181526008602081815260409283902086905582518381529283019190915267149959995c9c985b60c21b6060830152810184905260008051602061103c83398151915290608001610517565b61073c610976565b816001600160a01b0381166107635760405162461bcd60e51b81526004016104b590610edf565b6001600160a01b0383166000818152600b60209081526040918290208590558151828152600c928101929092526b21b7b73a3934b13aba34b7b760a11b6060830152810184905260008051602061103c83398151915290608001610517565b6107ca610976565b6001600160a01b0381166107f457604051631e4fbdf760e01b8152600060048201526024016104b5565b61055281610ab6565b610805610976565b61080d610b08565b806001600160a01b0381166108345760405162461bcd60e51b81526004016104b590610edf565b6001600160a01b0382166000908152600b6020908152604080832054600a8352818420546009845282852054600885528386205460079095529285205491939092916108809190610f1e565b61088a9190610f1e565b6108949190610f1e565b61089e9190610f1e565b9050600081116108f05760405162461bcd60e51b815260206004820152601f60248201527f5573657220686173206e6f2073636f72657320746f206d696e74204241542e0060448201526064016104b5565b60006108fe6012600a611015565b6109089083611024565b90506109148482610b32565b836001600160a01b03167feabc78801c3b6a33c6ec6981d5375a09195842cd1139c227d8a162aa01fd612a8260405161094f91815260200190565b60405180910390a25050506105526001600655565b6109718383836001610b68565b505050565b6005546001600160a01b031633146105765760405163118cdaa760e01b81523360048201526024016104b5565b6001600160a01b038381166000908152600160209081526040808320938616835292905220546000198114610a1b5781811015610a0c57604051637dc7a0d960e11b81526001600160a01b038416600482015260248101829052604481018390526064016104b5565b610a1b84848484036000610b68565b50505050565b6001600160a01b038316610a4b57604051634b637e8f60e11b8152600060048201526024016104b5565b6001600160a01b038216610a755760405163ec442f0560e01b8152600060048201526024016104b5565b610971838383610c3d565b6001600160a01b038216610aaa57604051634b637e8f60e11b8152600060048201526024016104b5565b61056082600083610c3d565b600580546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600260065403610b2b57604051633ee5aeb560e01b815260040160405180910390fd5b6002600655565b6001600160a01b038216610b5c5760405163ec442f0560e01b8152600060048201526024016104b5565b61056060008383610c3d565b6001600160a01b038416610b925760405163e602df0560e01b8152600060048201526024016104b5565b6001600160a01b038316610bbc57604051634a1406b160e11b8152600060048201526024016104b5565b6001600160a01b0380851660009081526001602090815260408083209387168352929052208290558015610a1b57826001600160a01b0316846001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92584604051610c2f91815260200190565b60405180910390a350505050565b6001600160a01b038316610c68578060026000828254610c5d9190610f1e565b90915550610cda9050565b6001600160a01b03831660009081526020819052604090205481811015610cbb5760405163391434e360e21b81526001600160a01b038516600482015260248101829052604481018390526064016104b5565b6001600160a01b03841660009081526020819052604090209082900390555b6001600160a01b038216610cf657600280548290039055610d15565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610d5a91815260200190565b60405180910390a3505050565b600060208083528351808285015260005b81811015610d9457858101830151858201604001528201610d78565b506000604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b0381168114610dcc57600080fd5b919050565b60008060408385031215610de457600080fd5b610ded83610db5565b946020939093013593505050565b600080600060608486031215610e1057600080fd5b610e1984610db5565b9250610e2760208501610db5565b9150604084013590509250925092565b600060208284031215610e4957600080fd5b610e5282610db5565b9392505050565b600060208284031215610e6b57600080fd5b5035919050565b60008060408385031215610e8557600080fd5b610e8e83610db5565b9150610e9c60208401610db5565b90509250929050565b600181811c90821680610eb957607f821691505b602082108103610ed957634e487b7160e01b600052602260045260246000fd5b50919050565b6020808252600f908201526e496e76616c6964206164647265737360881b604082015260600190565b634e487b7160e01b600052601160045260246000fd5b8082018082111561048057610480610f08565b600181815b80851115610f6c578160001904821115610f5257610f52610f08565b80851615610f5f57918102915b93841c9390800290610f36565b509250929050565b600082610f8357506001610480565b81610f9057506000610480565b8160018114610fa65760028114610fb057610fcc565b6001915050610480565b60ff841115610fc157610fc1610f08565b50506001821b610480565b5060208310610133831016604e8410600b8410161715610fef575081810a610480565b610ff98383610f31565b806000190482111561100d5761100d610f08565b029392505050565b6000610e5260ff841683610f74565b808202811582820484141761048057610480610f0856fe0e9ea3aaf35cf9e8897643a4d5240fd604debe73361d1917894c1cbad6d01c15a26469706673582212209318017b0d1f4e42d54ffc93c76b8fd4ed1f023712116d151e1ba2545fa0698764736f6c63430008140033",
    "linkReferences": {},
    "deployedLinkReferences": {}
};

// Contract address (update after deployment)
var BATTokenContractAddress;

test('should deploy BATToken contract', async () => {
    let ContractToDeploy = new ContractFactory(BATTokenABI, BATTokenByteCode, walletAdmin);
    let result = await ContractToDeploy.deploy("Basic Attention Token", "BAT", 18, 1000000);
    BATTokenContractAddress = result.contract_address;
    let BATTokenContract = new Contract(BATTokenContractAddress, BATTokenABI, walletAdmin);

    console.log("BATToken contract is ", BATTokenContractAddress);
    expect(result).not.toBe(null);
    expect(BATTokenContract).not.toBe(null);
    let name = await BATTokenContract.name();
    let symbol = await BATTokenContract.symbol();
    let decimals = await BATTokenContract.decimals();
    let initialSupply = await BATTokenContract.totalSupply();

    expect(name).toBe("Basic Attention Token");
    expect(symbol).toBe("BAT");
    expect(decimals.toNumber()).toBe(18);
    expect(initialSupply.toNumber()).toBe(1000000 * 10**18);

    let balanceAdmin = await BATTokenContract.balanceOf(AddressAdmin);
    console.log("Token balance of the admin wallet: ", balanceAdmin.toString());
    expect(balanceAdmin.toNumber()).toBe(1000000 * 10**18);
});

test('should set engagement score', async () => {
    let BATTokenContract = new Contract(BATTokenContractAddress, BATTokenABI, walletAdmin);
    let result = await BATTokenContract.setEngagementScore(AddressUser1, 100);
    expect(result.hash).not.toBe(null);

    let engagementScore = await BATTokenContract.engagementScores(AddressUser1);
    console.log("Engagement score for user1: ", engagementScore.toString());
    expect(engagementScore.toNumber()).toBe(100);
});

test('should mint BAT tokens', async () => {
    let BATTokenContract = new Contract(BATTokenContractAddress, BATTokenABI, walletAdmin);
    let supplyBefore = await BATTokenContract.totalSupply();
    let balanceBefore = await BATTokenContract.balanceOf(AddressUser1);
    console.log("Total supply before minting new tokens: ", supplyBefore.toString());
    console.log("User1 balance before minting new tokens: ", balanceBefore.toString());

    let result = await BATTokenContract.mintBAT(AddressUser1);
    expect(result.hash).not.toBe(null);

    let supplyAfter = await BATTokenContract.totalSupply();
    let balanceAfter = await BATTokenContract.balanceOf(AddressUser1);
    console.log("Total supply after minting new tokens: ", supplyAfter.toString());
    console.log("User1 balance after minting new tokens: ", balanceAfter.toString());

    expect(supplyAfter.toNumber()).toBe(supplyBefore.toNumber() + 100 * 10**18); // assuming 100 as engagement score
    expect(balanceAfter.toNumber()).toBe(balanceBefore.toNumber() + 100 * 10**18);
});

test('should transfer 99.00 BAT to user1', async () => {
    let BATTokenContract = new Contract(BATTokenContractAddress, BATTokenABI, walletAdmin);
    let balanceBefore = await BATTokenContract.balanceOf(AddressUser1);
    let result = await BATTokenContract.transferBAT(AddressUser1, new BigNumber(99).times(10**18).toFixed());
    let balanceAfter = await BATTokenContract.balanceOf(AddressUser1);

    expect(result.hash).not.toBe(null);
    expect(balanceAfter.toNumber()).toBe(balanceBefore.toNumber() + 99 * 10**18);
});

test('should approve user2 to transfer 2.13 BAT from user1', async () => {
    let amount = new BigNumber(2.13).times(10**18).toFixed();
    let BATTokenContract1 = new Contract(BATTokenContractAddress, BATTokenABI, walletUser1);
    let BATTokenContract2 = new Contract(BATTokenContractAddress, BATTokenABI, walletUser2);

    let balanceBeforeUser1 = await BATTokenContract1.balanceOf(AddressUser1);
    let balanceBeforeUser2 = await BATTokenContract2.balanceOf(AddressUser2);
    await BATTokenContract1.approve(AddressUser2, amount);
    let allowance = await BATTokenContract1.allowance(AddressUser1, AddressUser2);
    console.log("Allowance[user1][user2]:", allowance.toString());

    let result = await BATTokenContract2.transferFrom(AddressUser1, AddressUser2, amount);
    let balanceAfterUser1 = await BATTokenContract1.balanceOf(AddressUser1);
    let balanceAfterUser2 = await BATTokenContract2.balanceOf(AddressUser2);

    expect(result.hash).not.toBe(null);
    expect(allowance.toNumber()).toBe(new BigNumber(amount).toNumber());
    expect(balanceAfterUser1.toNumber()).toBe(balanceBeforeUser1.toNumber() - new BigNumber(amount).toNumber());
    expect(balanceAfterUser2.toNumber()).toBe(balanceBeforeUser2.toNumber() + new BigNumber(amount).toNumber());
});
