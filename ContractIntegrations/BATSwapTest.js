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

const BATTokenAddress = "0x39bADb565B5AEe66B056B2b9eb87EF56c9D460A8";
const UniswapRouterAddress = "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45";
const WETHAddress = "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619";

var provider = new HttpProvider(ChainIds.Testnet);
var walletAdmin = new Wallet(PrivateKeyAdmin, provider);
var walletUser1 = new Wallet(PrivateKeyUser1, provider);
var walletUser2 = new Wallet(PrivateKeyUser2, provider);

const BATSwapABI = [
    {
        "inputs": [
          {
            "internalType": "address",
            "name": "_batToken",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "_uniswapRouter",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "_weth",
            "type": "address"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amountIn",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amountOut",
            "type": "uint256"
          }
        ],
        "name": "BATSwappedForETH",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amountIn",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amountOut",
            "type": "uint256"
          }
        ],
        "name": "BATSwappedForToken",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amountIn",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amountOut",
            "type": "uint256"
          }
        ],
        "name": "TokenSwappedForBAT",
        "type": "event"
      },
      {
        "inputs": [],
        "name": "batToken",
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
        "inputs": [],
        "name": "emergencyStop",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "emergencyStopped",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getBATBalance",
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
        "name": "getETHBalance",
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
            "name": "amountIn",
            "type": "uint256"
          }
        ],
        "name": "swapBATForETH",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "amountIn",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "tokenOut",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
          }
        ],
        "name": "swapBATForToken",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "amountIn",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "tokenIn",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
          }
        ],
        "name": "swapTokenForBAT",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "uniswapRouter",
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
        "inputs": [],
        "name": "weth",
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
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "withdrawETH",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
  
];

const BATSwapByteCode = {
   "bytecode": "0x60e060405234801561001057600080fd5b50604051610e71380380610e7183398101604081905261002f91610072565b6001600160a01b0392831660805290821660a0521660c0526000805460ff191690556100b5565b80516001600160a01b038116811461006d57600080fd5b919050565b60008060006060848603121561008757600080fd5b61009084610056565b925061009e60208501610056565b91506100ac60408501610056565b90509250925092565b60805160a05160c051610d1f6101526000396000818160f70152818161037d0152818161069c015261090801526000818161014b015281816101d6015281816102a9015281816103d401528181610588015281816106f3015281816107f4015261095f01526000818160b30152818161040a015281816104d6015281816105b7015281816106480152818161082301526108b40152610d1f6000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c8063735de9f711610071578063735de9f7146101465780637465b37d1461016d5780638037f06d14610175578063c177ee0e14610188578063e2749c961461019b578063f14210a6146101b857600080fd5b806322fbcec3146100ae5780633fc8cef3146100f257806363a599a41461011957806368f3e7d2146101235780636e94729814610136575b600080fd5b6100d57f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b0390911681526020015b60405180910390f35b6100d57f000000000000000000000000000000000000000000000000000000000000000081565b6101216101cb565b005b610121610131366004610ac3565b61026f565b475b6040519081526020016100e9565b6100d57f000000000000000000000000000000000000000000000000000000000000000081565b6101386104be565b610121610183366004610b07565b61054e565b610121610196366004610ac3565b6107ba565b6000546101a89060ff1681565b60405190151581526020016100e9565b6101216101c6366004610b07565b610a1f565b336001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161461025b5760405162461bcd60e51b815260206004820152602a60248201527f4f6e6c7920636f6e7472616374206f776e65722063616e2063616c6c20656d6560448201526907267656e637953746f760b41b60648201526084015b60405180910390fd5b6000805460ff19811660ff90911615179055565b60005460ff16156102925760405162461bcd60e51b815260040161025290610b20565b60405163095ea7b360e01b81526001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000811660048301526024820185905283169063095ea7b3906044016020604051808303816000875af1158015610301573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103259190610b4c565b50604080516002808252606082018352600092602083019080368337019050509050828160008151811061035b5761035b610b8b565b60200260200101906001600160a01b031690816001600160a01b0316815250507f0000000000000000000000000000000000000000000000000000000000000000816001815181106103af576103af610b8b565b6001600160a01b0392831660209182029290920101526040516338ed173960e01b81527f0000000000000000000000000000000000000000000000000000000000000000909116906338ed17399061043490879060009086907f0000000000000000000000000000000000000000000000000000000000000000908990600401610ba1565b6000604051808303816000875af1158015610453573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261047b9190810190610c12565b50604080518581526000602082015233917fcc09311c52e697720bb2fc803212e0a09966b2c8d430490128e9e75dc0a2af4591015b60405180910390a250505050565b6040516370a0823160e01b81523060048201526000907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906370a0823190602401602060405180830381865afa158015610525573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105499190610cd0565b905090565b60005460ff16156105715760405162461bcd60e51b815260040161025290610b20565b60405163095ea7b360e01b81526001600160a01b037f000000000000000000000000000000000000000000000000000000000000000081166004830152602482018390527f0000000000000000000000000000000000000000000000000000000000000000169063095ea7b3906044016020604051808303816000875af1158015610600573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106249190610b4c565b506040805160028082526060820183526000926020830190803683370190505090507f00000000000000000000000000000000000000000000000000000000000000008160008151811061067a5761067a610b8b565b60200260200101906001600160a01b031690816001600160a01b0316815250507f0000000000000000000000000000000000000000000000000000000000000000816001815181106106ce576106ce610b8b565b6001600160a01b0392831660209182029290920101526040516318cbafe560e01b81527f0000000000000000000000000000000000000000000000000000000000000000909116906318cbafe590610733908590600090869030904290600401610ba1565b6000604051808303816000875af1158015610752573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261077a9190810190610c12565b50604080518381526000602082015233917f53d9232bcfe13f8747af7aefb6d1d64b63559fdbd98fb63d671d3ea218aafcd9910160405180910390a25050565b60005460ff16156107dd5760405162461bcd60e51b815260040161025290610b20565b60405163095ea7b360e01b81526001600160a01b037f000000000000000000000000000000000000000000000000000000000000000081166004830152602482018590527f0000000000000000000000000000000000000000000000000000000000000000169063095ea7b3906044016020604051808303816000875af115801561086c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108909190610b4c565b506040805160028082526060820183526000926020830190803683370190505090507f0000000000000000000000000000000000000000000000000000000000000000816000815181106108e6576108e6610b8b565b60200260200101906001600160a01b031690816001600160a01b0316815250507f00000000000000000000000000000000000000000000000000000000000000008160018151811061093a5761093a610b8b565b6001600160a01b0392831660209182029290920101526040516338ed173960e01b81527f0000000000000000000000000000000000000000000000000000000000000000909116906338ed17399061099f908790600090869089908990600401610ba1565b6000604051808303816000875af11580156109be573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526109e69190810190610c12565b50604080518581526000602082015233917f3874358f0214fbea4bf6eb4396102577eb1115cc03811db957095ccf0743866391016104b0565b60005460ff1615610a425760405162461bcd60e51b815260040161025290610b20565b47811115610a925760405162461bcd60e51b815260206004820152601860248201527f496e73756666696369656e74204554482062616c616e636500000000000000006044820152606401610252565b604051339082156108fc029083906000818181858888f19350505050158015610abf573d6000803e3d6000fd5b5050565b600080600060608486031215610ad857600080fd5b8335925060208401356001600160a01b0381168114610af657600080fd5b929592945050506040919091013590565b600060208284031215610b1957600080fd5b5035919050565b60208082526012908201527110dbdb9d1c9858dd081a5cc81c185d5cd95960721b604082015260600190565b600060208284031215610b5e57600080fd5b81518015158114610b6e57600080fd5b9392505050565b634e487b7160e01b600052604160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b600060a082018783526020878185015260a0604085015281875180845260c086019150828901935060005b81811015610bf15784516001600160a01b031683529383019391830191600101610bcc565b50506001600160a01b03969096166060850152505050608001529392505050565b60006020808385031215610c2557600080fd5b825167ffffffffffffffff80821115610c3d57600080fd5b818501915085601f830112610c5157600080fd5b815181811115610c6357610c63610b75565b8060051b604051601f19603f83011681018181108582111715610c8857610c88610b75565b604052918252848201925083810185019188831115610ca657600080fd5b938501935b82851015610cc457845184529385019392850192610cab565b98975050505050505050565b600060208284031215610ce257600080fd5b505191905056fea26469706673582212201af0afbc2b41a4b1133b1c8c67c61a2a4b5f74f8d7da8834f4588426cf6b9c4564736f6c63430008140033",
  "deployedBytecode": "0x608060405234801561001057600080fd5b50600436106100a95760003560e01c8063735de9f711610071578063735de9f7146101465780637465b37d1461016d5780638037f06d14610175578063c177ee0e14610188578063e2749c961461019b578063f14210a6146101b857600080fd5b806322fbcec3146100ae5780633fc8cef3146100f257806363a599a41461011957806368f3e7d2146101235780636e94729814610136575b600080fd5b6100d57f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b0390911681526020015b60405180910390f35b6100d57f000000000000000000000000000000000000000000000000000000000000000081565b6101216101cb565b005b610121610131366004610ac3565b61026f565b475b6040519081526020016100e9565b6100d57f000000000000000000000000000000000000000000000000000000000000000081565b6101386104be565b610121610183366004610b07565b61054e565b610121610196366004610ac3565b6107ba565b6000546101a89060ff1681565b60405190151581526020016100e9565b6101216101c6366004610b07565b610a1f565b336001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161461025b5760405162461bcd60e51b815260206004820152602a60248201527f4f6e6c7920636f6e7472616374206f776e65722063616e2063616c6c20656d6560448201526907267656e637953746f760b41b60648201526084015b60405180910390fd5b6000805460ff19811660ff90911615179055565b60005460ff16156102925760405162461bcd60e51b815260040161025290610b20565b60405163095ea7b360e01b81526001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000811660048301526024820185905283169063095ea7b3906044016020604051808303816000875af1158015610301573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103259190610b4c565b50604080516002808252606082018352600092602083019080368337019050509050828160008151811061035b5761035b610b8b565b60200260200101906001600160a01b031690816001600160a01b0316815250507f0000000000000000000000000000000000000000000000000000000000000000816001815181106103af576103af610b8b565b6001600160a01b0392831660209182029290920101526040516338ed173960e01b81527f0000000000000000000000000000000000000000000000000000000000000000909116906338ed17399061043490879060009086907f0000000000000000000000000000000000000000000000000000000000000000908990600401610ba1565b6000604051808303816000875af1158015610453573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261047b9190810190610c12565b50604080518581526000602082015233917fcc09311c52e697720bb2fc803212e0a09966b2c8d430490128e9e75dc0a2af4591015b60405180910390a250505050565b6040516370a0823160e01b81523060048201526000907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906370a0823190602401602060405180830381865afa158015610525573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105499190610cd0565b905090565b60005460ff16156105715760405162461bcd60e51b815260040161025290610b20565b60405163095ea7b360e01b81526001600160a01b037f000000000000000000000000000000000000000000000000000000000000000081166004830152602482018390527f0000000000000000000000000000000000000000000000000000000000000000169063095ea7b3906044016020604051808303816000875af1158015610600573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106249190610b4c565b506040805160028082526060820183526000926020830190803683370190505090507f00000000000000000000000000000000000000000000000000000000000000008160008151811061067a5761067a610b8b565b60200260200101906001600160a01b031690816001600160a01b0316815250507f0000000000000000000000000000000000000000000000000000000000000000816001815181106106ce576106ce610b8b565b6001600160a01b0392831660209182029290920101526040516318cbafe560e01b81527f0000000000000000000000000000000000000000000000000000000000000000909116906318cbafe590610733908590600090869030904290600401610ba1565b6000604051808303816000875af1158015610752573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261077a9190810190610c12565b50604080518381526000602082015233917f53d9232bcfe13f8747af7aefb6d1d64b63559fdbd98fb63d671d3ea218aafcd9910160405180910390a25050565b60005460ff16156107dd5760405162461bcd60e51b815260040161025290610b20565b60405163095ea7b360e01b81526001600160a01b037f000000000000000000000000000000000000000000000000000000000000000081166004830152602482018590527f0000000000000000000000000000000000000000000000000000000000000000169063095ea7b3906044016020604051808303816000875af115801561086c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108909190610b4c565b506040805160028082526060820183526000926020830190803683370190505090507f0000000000000000000000000000000000000000000000000000000000000000816000815181106108e6576108e6610b8b565b60200260200101906001600160a01b031690816001600160a01b0316815250507f00000000000000000000000000000000000000000000000000000000000000008160018151811061093a5761093a610b8b565b6001600160a01b0392831660209182029290920101526040516338ed173960e01b81527f0000000000000000000000000000000000000000000000000000000000000000909116906338ed17399061099f908790600090869089908990600401610ba1565b6000604051808303816000875af11580156109be573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526109e69190810190610c12565b50604080518581526000602082015233917f3874358f0214fbea4bf6eb4396102577eb1115cc03811db957095ccf0743866391016104b0565b60005460ff1615610a425760405162461bcd60e51b815260040161025290610b20565b47811115610a925760405162461bcd60e51b815260206004820152601860248201527f496e73756666696369656e74204554482062616c616e636500000000000000006044820152606401610252565b604051339082156108fc029083906000818181858888f19350505050158015610abf573d6000803e3d6000fd5b5050565b600080600060608486031215610ad857600080fd5b8335925060208401356001600160a01b0381168114610af657600080fd5b929592945050506040919091013590565b600060208284031215610b1957600080fd5b5035919050565b60208082526012908201527110dbdb9d1c9858dd081a5cc81c185d5cd95960721b604082015260600190565b600060208284031215610b5e57600080fd5b81518015158114610b6e57600080fd5b9392505050565b634e487b7160e01b600052604160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b600060a082018783526020878185015260a0604085015281875180845260c086019150828901935060005b81811015610bf15784516001600160a01b031683529383019391830191600101610bcc565b50506001600160a01b03969096166060850152505050608001529392505050565b60006020808385031215610c2557600080fd5b825167ffffffffffffffff80821115610c3d57600080fd5b818501915085601f830112610c5157600080fd5b815181811115610c6357610c63610b75565b8060051b604051601f19603f83011681018181108582111715610c8857610c88610b75565b604052918252848201925083810185019188831115610ca657600080fd5b938501935b82851015610cc457845184529385019392850192610cab565b98975050505050505050565b600060208284031215610ce257600080fd5b505191905056fea26469706673582212201af0afbc2b41a4b1133b1c8c67c61a2a4b5f74f8d7da8834f4588426cf6b9c4564736f6c63430008140033",
  "linkReferences": {},
  "deployedLinkReferences": {}
};

let BATSwapContractAddress;

test('should deploy BATSwap contract', async () => {
    let ContractToDeploy = new ContractFactory(BATSwapABI, BATSwapByteCode, walletAdmin);
    let result = await ContractToDeploy.deploy(BATTokenAddress, UniswapRouterAddress, WETHAddress);
    BATSwapContractAddress = result.contract_address;
    let BATSwapContract = new Contract(BATSwapContractAddress, BATSwapABI, walletAdmin);

    console.log("BATSwap contract is deployed at ", BATSwapContractAddress);
    expect(result).not.toBe(null);
    expect(BATSwapContract).not.toBe(null);
    
    // Check contract state variables
    let batToken = await BATSwapContract.batToken();
    let uniswapRouter = await BATSwapContract.uniswapRouter();
    let weth = await BATSwapContract.weth();
    let emergencyStopped = await BATSwapContract.emergencyStopped();

    expect(batToken).toBe(BATTokenAddress);
    expect(uniswapRouter).toBe(UniswapRouterAddress);
    expect(weth).toBe(WETHAddress);
    expect(emergencyStopped).toBe(false);
});

// Helper function to get the swap event logs
const getSwapEvents = async (contract, eventName) => {
    const logs = await provider.getLogs({
        address: BATSwapContractAddress,
        topics: [contract.interface.getEventTopic(eventName)],
        fromBlock: 0,
        toBlock: 'latest'
    });
    return logs.map(log => contract.interface.parseLog(log));
};

test('should swap BAT for ETH', async () => {
    let BATSwapContract = new Contract(BATSwapContractAddress, BATSwapABI, walletUser1);
    // User should have approved BATSwapContract to spend their BAT tokens
    let amountIn = new BigNumber(10).times(10**18).toFixed(); // Example amount

    await BATTokenContract.connect(walletUser1).approve(BATSwapContractAddress, amountIn);
    let result = await BATSwapContract.swapBATForETH(amountIn);
    console.log("Swap BAT for ETH tx hash: ", result.hash);
    expect(result.hash).not.toBe(null);
    
    // Check balances
    let ethBalance = await BATSwapContract.getETHBalance();
    console.log("ETH balance of the BATSwap contract: ", ethBalance.toString());

    // Verify the BATSwappedForETH event
    let events = await getSwapEvents(BATSwapContract, 'BATSwappedForETH');
    expect(events.length).toBeGreaterThan(0);
    expect(events[0].args.amountIn.toString()).toBe(amountIn);
});

test('should fail to swap BAT for ETH if contract is paused', async () => {
    let BATSwapContract = new Contract(BATSwapContractAddress, BATSwapABI, walletAdmin);
    await BATSwapContract.emergencyStop(); // Pause the contract

    let BATSwapContractUser = new Contract(BATSwapContractAddress, BATSwapABI, walletUser1);
    let amountIn = new BigNumber(10).times(10**18).toFixed(); // Example amount

    await expect(BATSwapContractUser.swapBATForETH(amountIn)).rejects.toThrow('Contract is paused');

    // Unpause the contract for further tests
    await BATSwapContract.emergencyStop();
});

test('should swap BAT for another token', async () => {
    let BATSwapContract = new Contract(BATSwapContractAddress, BATSwapABI, walletUser1);
    let amountIn = new BigNumber(10).times(10**18).toFixed(); // Example amount
    let tokenOut = "0xYourOtherTokenAddress"; // Replace with the actual token address
    let deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from now

    await BATTokenContract.connect(walletUser1).approve(BATSwapContractAddress, amountIn);
    let result = await BATSwapContract.swapBATForToken(amountIn, tokenOut, deadline);
    console.log("Swap BAT for another token tx hash: ", result.hash);
    expect(result.hash).not.toBe(null);
    
    // Verify the BATSwappedForToken event
    let events = await getSwapEvents(BATSwapContract, 'BATSwappedForToken');
    expect(events.length).toBeGreaterThan(0);
    expect(events[0].args.amountIn.toString()).toBe(amountIn);
});

test('should fail to swap BAT for another token if contract is paused', async () => {
    let BATSwapContract = new Contract(BATSwapContractAddress, BATSwapABI, walletAdmin);
    await BATSwapContract.emergencyStop(); // Pause the contract

    let BATSwapContractUser = new Contract(BATSwapContractAddress, BATSwapABI, walletUser1);
    let amountIn = new BigNumber(10).times(10**18).toFixed(); // Example amount
    let tokenOut = "0xYourOtherTokenAddress"; // Replace with the actual token address
    let deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from now

    await expect(BATSwapContractUser.swapBATForToken(amountIn, tokenOut, deadline)).rejects.toThrow('Contract is paused');

    // Unpause the contract for further tests
    await BATSwapContract.emergencyStop();
});

test('should swap another token for BAT', async () => {
    let BATSwapContract = new Contract(BATSwapContractAddress, BATSwapABI, walletUser1);
    let amountIn = new BigNumber(10).times(10**18).toFixed(); // Example amount
    let tokenIn = "0xYourOtherTokenAddress"; // Replace with the actual token address
    let deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from now

    await IERC20(tokenIn).connect(walletUser1).approve(BATSwapContractAddress, amountIn);
    let result = await BATSwapContract.swapTokenForBAT(amountIn, tokenIn, deadline);
    console.log("Swap another token for BAT tx hash: ", result.hash);
    expect(result.hash).not.toBe(null);

    // Verify the TokenSwappedForBAT event
    let events = await getSwapEvents(BATSwapContract, 'TokenSwappedForBAT');
    expect(events.length).toBeGreaterThan(0);
    expect(events[0].args.amountIn.toString()).toBe(amountIn);
});

test('should fail to swap another token for BAT if contract is paused', async () => {
    let BATSwapContract = new Contract(BATSwapContractAddress, BATSwapABI, walletAdmin);
    await BATSwapContract.emergencyStop(); // Pause the contract

    let BATSwapContractUser = new Contract(BATSwapContractAddress, BATSwapABI, walletUser1);
    let amountIn = new BigNumber(10).times(10**18).toFixed(); // Example amount
    let tokenIn = "0xYourOtherTokenAddress"; // Replace with the actual token address
    let deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from now

    await expect(BATSwapContractUser.swapTokenForBAT(amountIn, tokenIn, deadline)).rejects.toThrow('Contract is paused');

    // Unpause the contract for further tests
    await BATSwapContract.emergencyStop();
});

test('should withdraw ETH', async () => {
    let BATSwapContract = new Contract(BATSwapContractAddress, BATSwapABI, walletAdmin);
    let amountToWithdraw = new BigNumber(1).times(10**18).toFixed(); // Example amount
    
    let result = await BATSwapContract.withdrawETH(amountToWithdraw);
    console.log("Withdraw ETH tx hash: ", result.hash);
    expect(result.hash).not.toBe(null);

    let ethBalance = await BATSwapContract.getETHBalance();
    console.log("ETH balance of the BATSwap contract after withdrawal: ", ethBalance.toString());
    expect(ethBalance.toNumber()).toBeLessThanOrEqual(0);
});

test('should fail to withdraw more ETH than available', async () => {
    let BATSwapContract = new Contract(BATSwapContractAddress, BATSwapABI, walletAdmin);
    let amountToWithdraw = new BigNumber(100).times(10**18).toFixed(); // Example amount

    await expect(BATSwapContract.withdrawETH(amountToWithdraw)).rejects.toThrow('Insufficient ETH balance');
});

test('should toggle emergency stop', async () => {
    let BATSwapContract = new Contract(BATSwapContractAddress, BATSwapABI, walletAdmin);
    
    let result = await BATSwapContract.emergencyStop();
    console.log("Toggle emergency stop tx hash: ", result.hash);
    expect(result.hash).not.toBe(null);
    
    let emergencyStopped = await BATSwapContract.emergencyStopped();
    expect(emergencyStopped).toBe(true);

    // Toggle back to not stopped
    result = await BATSwapContract.emergencyStop();
    console.log("Toggle emergency stop back tx hash: ", result.hash);
    expect(result.hash).not.toBe(null);

    emergencyStopped = await BATSwapContract.emergencyStopped();
    expect(emergencyStopped).toBe(false);
});

test('should fail to withdraw ETH if not the admin', async () => {
    let BATSwapContract = new Contract(BATSwapContractAddress, BATSwapABI, walletUser1);
    let amountToWithdraw = new BigNumber(1).times(10**18).toFixed(); // Example amount
    
    await expect(BATSwapContract.withdrawETH(amountToWithdraw)).rejects.toThrow('Ownable: caller is not the owner');
});

test('should approve user2 to transfer 2.13 BAT from user1', async () => {
    let amount = new BigNumber(2.13).times(10**18).toFixed();
    let BATTokenContract1 = new Contract(BATTokenAddress, BATTokenABI, walletUser1);
    let BATTokenContract2 = new Contract(BATTokenAddress, BATTokenABI, walletUser2);

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

test('should fail to approve a negative BAT amount', async () => {
    let amount = new BigNumber(-2.13).times(10**18).toFixed();
    let BATTokenContract1 = new Contract(BATTokenAddress, BATTokenABI, walletUser1);

    await expect(BATTokenContract1.approve(AddressUser2, amount)).rejects.toThrow('Amount must be non-negative');
});

test('should fail to transfer more BAT than balance', async () => {
    let amount = new BigNumber(1000000).times(10**18).toFixed(); // Example amount greater than balance
    let BATTokenContract = new Contract(BATTokenAddress, BATTokenABI, walletUser1);

    await expect(BATTokenContract.transferBAT(AddressUser2, amount)).rejects.toThrow('ERC20: transfer amount exceeds balance');
});
