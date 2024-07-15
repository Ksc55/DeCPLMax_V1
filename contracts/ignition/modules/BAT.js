const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("DeployModule", (m) => {
  // Define initial parameters
  const uniswapRouter = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"; // Replace with actual Uniswap Router address
  const weth = "0xa2881a90bf33f03e7a3f803765cd2ed5c8928dfb"; // Replace with actual WETH address

  // Deploy BATToken contract
  const batToken = m.contract("BATToken", []);

  // Deploy BATSwap contract using the address of the deployed BATToken
  const batSwap = m.contract("BATSwap", [batToken, uniswapRouter, weth]);

  // Return the deployed contract instances
  return { batToken, batSwap };
});
