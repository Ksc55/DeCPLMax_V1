import React, { useState, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  IconButton,
  Input,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ConnectButton } from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { createThirdwebClient, defineChain } from "thirdweb";
import DeCPLMax from "../assets/DeCPLMax.png";

export function Topbar() {
  const [openNav, setOpenNav] = React.useState(false);

  const handleLogout = () => {
    window.location.href = "/";
  };

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

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <div className="w-[400px]">
        <Input
          label="Search"
          icon={<MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />}
        />
      </div>
    </ul>
  );

  return (
    <Navbar className="mx-auto shadow-none px-4 py-2 lg:px-8 lg:py-4  ">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="/"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          <img
                  src={DeCPLMax}
                  alt="DeCPLmax Logo"
                  className="h-20 w-32 object-cover object-center"
          />
        </Typography>

        <div className="hidden lg:block">{navList}</div>
        <div className="flex items-center gap-x-4">
            <label className="rounded-full border border-blue-500 px-3 text-[12px] md:px-4 py-2 cursor-pointer">
              <input type="file" accept="video/*" className="hidden" />
              Add Video
            </label>
         

          <div className="flex items-center gap-4 cursor-pointer">
            <ConnectButton
              onConnect={handleLogout} // Logout function
              client={client}
              wallets={wallets}
            />
          </div>
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">{navList}</div>
      </MobileNav>  
     
    </Navbar>
  );
}
