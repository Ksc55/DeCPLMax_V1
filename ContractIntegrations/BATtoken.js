const Theta = require('@thetalabs/theta-js');
const Web3 = require('web3');

// Set up web3 with Theta provider
const provider = new Theta.providers.HttpProvider('https://eth-rpc-api-testnet.thetatoken.org/rpc');
const web3 = new Web3(provider);

// Contract ABI and address
const abi = [
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

const contractAddress = '0x39bADb565B5AEe66B056B2b9eb87EF56c9D460A8';

// Initialize contract
const BATToken = new web3.eth.Contract(abi, contractAddress);

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
    } catch (error) {
        console.error('Transaction error:', error);
    }
}

// Function to set engagement score
async function setEngagementScore(user, score, fromAddress, privateKey) {
    const tx = BATToken.methods.setEngagementScore(user, score);
    await sendTransaction(tx, fromAddress, privateKey);
}

// Function to set referral score
async function setReferralScore(user, score, fromAddress, privateKey) {
    const tx = BATToken.methods.setReferralScore(user, score);
    await sendTransaction(tx, fromAddress, privateKey);
}

// Function to set lead generation score
async function setLeadGenerationScore(user, score, fromAddress, privateKey) {
    const tx = BATToken.methods.setLeadGenerationScore(user, score);
    await sendTransaction(tx, fromAddress, privateKey);
}

// Function to set view score
async function setViewScore(user, score, fromAddress, privateKey) {
    const tx = BATToken.methods.setViewScore(user, score);
    await sendTransaction(tx, fromAddress, privateKey);
}

// Function to set contribution score
async function setContributionScore(user, score, fromAddress, privateKey) {
    const tx = BATToken.methods.setContributionScore(user, score);
    await sendTransaction(tx, fromAddress, privateKey);
}

// Function to mint BAT tokens
async function mintBAT(user, fromAddress, privateKey) {
    const tx = BATToken.methods.mintBAT(user);
    await sendTransaction(tx, fromAddress, privateKey);
}

// Function to transfer BAT tokens
async function transferBAT(recipient, amount, fromAddress, privateKey) {
    const tx = BATToken.methods.transferBAT(recipient, amount);
    await sendTransaction(tx, fromAddress, privateKey);
}

// Function to burn BAT tokens
async function burnBAT(amount, fromAddress, privateKey) {
    const tx = BATToken.methods.burnBAT(amount);
    await sendTransaction(tx, fromAddress, privateKey);
}

// Example usage
const userAddress = '0xUserAddressHere';
const recipientAddress = '0xRecipientAddressHere';
const ownerAddress = '0xOwnerAddressHere';
const privateKey = process.env.PRIVKEY; // Replace with the owner's private key

setEngagementScore(userAddress, 100, ownerAddress, privateKey);
setReferralScore(userAddress, 50, ownerAddress, privateKey);
setLeadGenerationScore(userAddress, 25, ownerAddress, privateKey);
setViewScore(userAddress, 75, ownerAddress, privateKey);
setContributionScore(userAddress, 60, ownerAddress, privateKey);
mintBAT(userAddress, ownerAddress, privateKey);
transferBAT(recipientAddress, 100 * 10**18, ownerAddress, privateKey); // Transfer 100 BAT tokens
burnBAT(50 * 10**18, ownerAddress, privateKey); // Burn 50 BAT tokens



