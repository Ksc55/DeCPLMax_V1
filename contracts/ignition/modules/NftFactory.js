const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


module.exports = buildModule("Deploy", (m) => {

  const nftFactory = m.contract("NftFactory", []);

  return { nftFactory  };
});