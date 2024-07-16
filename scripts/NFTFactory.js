// Set up theta js Theta provider
const thetajs = require("@thetalabs/theta-js");
const chainId = thetajs.networks.ChainIds.Testnet;
const theta_provider = new thetajs.providers.HttpProvider(chainId);
//const Theta = require("@thetalabs/theta-js");

// Set up web3 with Theta provider
const Web3 = require("web3");
const theta_testnet_rpc = 'https://eth-rpc-api-testnet.thetatoken.org/rpc';
//const provider = new Theta.providers.HttpProvider('https://eth-rpc-api-testnet.thetatoken.org/rpc');
const web3 = new Web3(theta_testnet_rpc);
const chainID = 365 

// Contract ABI and address
const abi = [
    {
      "inputs": [],
      "name": "CollectionExist",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "collectionAddress",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "collectionOwner",
          "type": "address"
        }
      ],
      "name": "CollectionCreated",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name_",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "symbol_",
          "type": "string"
        }
      ],
      "name": "createCollection",
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
      "name": "usernameToNftCollectionAddress",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

const contractAddress = '0x6A00cB56db75888a505b8DF5eE0704945A558494';

// Initialize contract
const NFTFactory = new web3.eth.Contract(abi, contractAddress);

// Helper function to send transactions
async function sendTransaction(tx, fromAddress, privateKey) {
    try {
        const gas = await tx.estimateGas({ from: fromAddress });
        const gasPrice = await web3.eth.getGasPrice();

        const txData = tx.encodeABI();

        const signedTx = await web3.eth.accounts.signTransaction(
            {
                to: contractAddress,
                data: txData,
                gas,
                gasPrice,
            },
            privateKey
        );

        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log('Transaction receipt:', receipt);
        return receipt;
    } catch (error) {
        console.error('Transaction error:', error);
    }
}

/** read function helper
async function readFunction(contractAddress, plugin) {
    let nftProvider;
    try { 
     if (plugin === 'thetajs'){
       nftProvider = new thetajs.Contract(contractAddress, abi, theta_provider);
     }
     else {
        nftProvider = new web3.eth.Contract(abi, contractAddress);
     }
     console.log('contract :', nftProvider);
     return nftProvider;
    } catch (error) {
        console.error('Transaction error:', error);
    }
} **/

// Function to create NFT collection
async function createCollection(collectionName, collectionSymbol, fromAddress, privateKey) {
    const tx = NFTFactory.methods.createCollection(collectionName, collectionSymbol);
    const create_collection_response = await sendTransaction(tx, fromAddress, privateKey);
    return create_collection_response;
}


// Function to get the username for Nft collection
async function usernameToNftCollectionAddress(userAddress, nftContractAddress) {
    const NFTContract = new thetajs.Contract(nftContractAddress, abi, theta_provider);
    const nft_collection_user_name = await NFTContract.usernameToNftCollectionAddress(userAddress);
    return nft_collection_user_name;
}


module.exports = {
    createCollection,
    usernameToNftCollectionAddress
}
/**
// Example usage
const collectionName = "video_advert_001"
const collectionSymbol = "VidAdv01";
const userAddress = '0xUserAddressHere';
const recipientAddress = '0xRecipientAddressHere';
const ownerAddress = '0xOwnerAddressHere';
const privateKey = process.env.PRIVKEY; // Replace with the owner's private key

createCollection(collectionName, collectionSymbol, ownerAddress, privateKey);
usernameToNftCollectionAddress(userAddress, contractAddress);

**/