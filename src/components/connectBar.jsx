import React from "react";
import { ConnectButton } from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { createThirdwebClient, defineChain } from "thirdweb";

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

const ConnectBar = () => {
  return (
    <>
      <div>
        <div class="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
          <div class="-m-6 max-h-[768px] w-[calc(100%+48px)] overflow-scroll">
            <nav class="sticky top-0 z-10 block w-full max-w-full px-4 py-2 text-white bg-white border rounded-none shadow-md h-max border-white/80 bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4">
              <div class="flex items-center justify-between text-blue-gray-900">
                <a
                  href="#"
                  class="mr-4 block cursor-pointer py-1.5 font-sans text-base font-medium leading-relaxed text-inherit antialiased"
                >
                  Theta hack
                </a>
                <div class="flex items-center gap-4">
                  <div class=" mr-4">
                    <ConnectButton client={client} wallets={wallets} />
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConnectBar;
