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
    // Add the BATSwap ABI here
];
const contractAddress = '0x362c813A72E687FF5fa6602F37a62B3D2216CDfD';

// Initialize contract
const BATSwap = new web3.eth.Contract(abi, contractAddress);

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

// Function to swap BAT for ETH
async function swapBATForETH(amountIn, fromAddress, privateKey) {
    const tx = BATSwap.methods.swapBATForETH(amountIn);
    await sendTransaction(tx, fromAddress, privateKey);
}

// Function to swap BAT for another token
async function swapBATForToken(amountIn, tokenOut, deadline, fromAddress, privateKey) {
    const tx = BATSwap.methods.swapBATForToken(amountIn, tokenOut, deadline);
    await sendTransaction(tx, fromAddress, privateKey);
}

// Function to swap another token for BAT
async function swapTokenForBAT(amountIn, tokenIn, deadline, fromAddress, privateKey) {
    const tx = BATSwap.methods.swapTokenForBAT(amountIn, tokenIn, deadline);
    await sendTransaction(tx, fromAddress, privateKey);
}

// Function to get BAT balance
async function getBATBalance() {
    const balance = await BATSwap.methods.getBATBalance().call();
    console.log('BAT Balance:', balance);
}

// Function to get ETH balance
async function getETHBalance() {
    const balance = await BATSwap.methods.getETHBalance().call();
    console.log('ETH Balance:', balance);
}

// Function to withdraw ETH
async function withdrawETH(amount, fromAddress, privateKey) {
    const tx = BATSwap.methods.withdrawETH(amount);
    await sendTransaction(tx, fromAddress, privateKey);
}

// Function to toggle emergency stop
async function toggleEmergencyStop(fromAddress, privateKey) {
    const tx = BATSwap.methods.emergencyStop();
    await sendTransaction(tx, fromAddress, privateKey);
}

// Function to check if the contract is paused
async function isContractPaused() {
    const paused = await BATSwap.methods.emergencyStopped().call();
    console.log('Is contract paused:', paused);
}

// Example usage
/*(async () => {
    const fromAddress = '0xYourAddress'; // Replace with your address
    const privateKey = 'YOUR_PRIVATE_KEY'; // Replace with your private key

    const amountIn = web3.utils.toWei('10', 'ether'); // Example amount in BAT
    const tokenOut = '0xTokenOutAddress'; // Replace with the tokenOut address
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current Unix time

    // Example calls
    await swapBATForETH(amountIn, fromAddress, privateKey);
    await swapBATForToken(amountIn, tokenOut, deadline, fromAddress, privateKey);
    await swapTokenForBAT(amountIn, tokenOut, deadline, fromAddress, privateKey);
    await getBATBalance();
    await getETHBalance();
    await withdrawETH(web3.utils.toWei('1', 'ether'), fromAddress, privateKey); // Withdraw 1 ETH
    await toggleEmergencyStop(fromAddress, privateKey);
    await isContractPaused();
})();*/
