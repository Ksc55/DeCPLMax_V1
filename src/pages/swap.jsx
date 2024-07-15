import { Button } from "@material-tailwind/react";
import { Outlet, Link } from "react-router-dom";

function Swap() {
  return (
    <div className=" bg-blue-gray-100 h-screen p-8">
      <div className="text-center text-2xl">Swap Theta coins to BATs</div>
      <div className="grid place-content-center p-12">
        <div className="bg-white m-6 p-10 text-lg rounded-2xl shadow-lg shadow-blue-gray-200 ">
          <div className="">
            <span>
              <input
                type="text"
                placeholder="amount"
                className="m-2 p-1 focus:outline-none col text-gray-500	"
              />
            </span>
            <span>THETA</span>
          </div>{" "}
          <div className="grid place-content-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
              />
            </svg>
          </div>
          <div>
            <span>
              <input
                type="text"
                placeholder="amount"
                className="m-2 p-1 focus:outline-none col text-gray-500	"
              />
            </span>
            <span>BAT</span>
          </div>{" "}
          <div className="block p-3 bg-black rounded-xl text-white text-center shadow-lg shadow-blue-gray-200 cursor-pointer">
            swap
          </div>
        </div>
      </div>
    </div>
  );
}

export default Swap;
