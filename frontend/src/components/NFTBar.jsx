import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PasswordModal from "../modal/PasswordModal";

function NFTBar() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleTransferClick = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handlePasswordConfirm = (password) => {
    const storedPin = localStorage.getItem("pin");

    if (password === storedPin) {
      toast.success("PIN correct! Transfer will proceed.");
      console.log("Proceeding with transfer logic...");
      // Add your transfer logic here
    } else {
      toast.error("PIN incorrect! Transfer failed.");
    }

    setModalOpen(false);
  };

  return (
    <>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3 container mx-auto lg:py-20">
        <Card className="max-w-[24rem] overflow-hidden">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 rounded-none"
          >
            <img
              src="https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/monkey-g412399084_1280.jpg"
              alt="NFT"
            />
          </CardHeader>
          <CardBody>
            <Typography variant="body" color="blue-gray">
              Theta NFT
            </Typography>
            <Typography variant="h4" color="blue-gray">
              0x00000000000000
            </Typography>
            <Typography
              variant="lead"
              color="gray"
              className="mt-3 font-normal"
            >
              The NFT description
            </Typography>
          </CardBody>
          <div
            className="block p-3 bg-black rounded-xl text-white text-center shadow-lg shadow-blue-gray-200 cursor-pointer"
            onClick={handleTransferClick}
          >
            Transfer
          </div>
        </Card>

        <Card className="max-w-[24rem] overflow-hidden">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 rounded-none"
          >
            <img
              src="https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/monkey-g412399084_1280.jpg"
              alt="NFT"
            />
          </CardHeader>
          <CardBody>
            <Typography variant="body" color="blue-gray">
              Theta NFT
            </Typography>
            <Typography variant="h4" color="blue-gray">
              0x00000000000000
            </Typography>
            <Typography
              variant="lead"
              color="gray"
              className="mt-3 font-normal"
            >
              The NFT description
            </Typography>
          </CardBody>
          <div
            className="block p-3 bg-black rounded-xl text-white text-center shadow-lg shadow-blue-gray-200 cursor-pointer"
            onClick={handleTransferClick}
          >
            Transfer
          </div>
        </Card>
      </div>

      {modalOpen && (
        <PasswordModal
          onClose={handleModalClose}
          onConfirm={handlePasswordConfirm}
        />
      )}

      <ToastContainer />
    </>
  );
}

export default NFTBar;
