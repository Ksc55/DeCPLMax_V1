require("@nomicfoundation/hardhat-ignition");

task("deploy", "Deploys the contracts using Ignition")
  .setAction(async (taskArgs, hre) => {
    const { ignition } = hre;

    try {
      const deployments = await ignition.deploy("DeployModule");

      const batToken = deployments.BATToken;
      const batSwap = deployments.BATSwap;

      console.log("BATToken deployed to:", batToken.address);
      console.log("BATSwap deployed to:", batSwap.address);
    } catch (error) {
      console.error("Error deploying contracts:", error);
    }
  });

module.exports = {
  solidity: "0.8.20",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
  },
};
