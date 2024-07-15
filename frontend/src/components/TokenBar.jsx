import React from "react";

function TokenBar() {
  return (
    <div className="shadow-sm shadow-blue-gray-200 p-4 rounded-md">
      <div className="flex justify-around text-blue-500 text-sm mb-4 text-xl">
        <div className="p-4">Token</div>
        <div className="p-4">Balance</div>
      </div>
      <div className="flex justify-around items-center hover:bg-blue-500 p-3 hover:text-white bg-gray-500 cursor-pointer rounded-md transition duration-300">
        <div>BAT</div>
        <div>2.6$</div>
      </div>
      <div className="flex justify-around items-center hover:bg-blue-500 p-3 hover:text-white bg-gray-500 cursor-pointer mt-4 rounded-md transition duration-300">
        <div>THETA</div>
        <div>2.6$</div>
      </div>
    </div>
  );
}

export default TokenBar;
