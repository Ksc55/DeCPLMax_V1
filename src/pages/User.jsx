import { ConnectButton } from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { createThirdwebClient, defineChain } from "thirdweb";
import React, { useState } from "react";
import TokenBar from "../components/TokenBar";
import NFTBar from "../components/NFTBar";
import { Topbar } from "../components/Topbar";
import { SidebarDefault } from "../components/SidebarDefault";
function User() {
  const client = createThirdwebClient({
    clientId: "379ff66a369f3e12df6535c7008603a5",
  });

  const myChain = defineChain({
    id: 2442,
    rpc: "https://polygon-zkevm-cardona.blockpi.network/v1/rpc/public",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
  });

  const wallets = [
    inAppWallet(),
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    createWallet("me.rainbow"),
  ];

  const [showDetails, setShowDetails] = useState("Token");
  
  const showNFTDetails = () => {
    setShowDetails("NFT");
  };

  const showTokenDetails = () => {
    setShowDetails("Token");
  };

  return (
    <div className='flex flex-col'>
    <Topbar />
    <div className='flex'>
        <SidebarDefault />
    <div className="m-6">
      <div className="flex justify-between lg:px-32 py-12 ">
        <div className="flex border-slate-950	rounded-full	border-2  bg-blue-500 text-white	">
          <button
            onClick={showTokenDetails}
            className="px-12 rounded-full active:bg-black"
            style={{
              backgroundColor: showDetails === "Token" ? "black" : "",
            }}
          >
            Token
          </button>
          <button
            onClick={showNFTDetails}
            className="px-12 rounded-full  active:bg-black"
            style={{
              backgroundColor: showDetails === "NFT" ? "black" : "",
            }}
          >
            NFT
          </button>
        </div>
        <div className=" mr-4">
          <ConnectButton client={client} wallets={wallets} />
        </div>
      </div>

      
      {showDetails === "Token" && <TokenBar />}
      {showDetails === "NFT" && <NFTBar />}
    </div>
    </div>
    </div>
  );
}

export default User;
