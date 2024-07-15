import React, { useState } from "react";

const PinModal = ({ isOpen, onClose, onSavePin }) => {
  const [pin, setPin] = useState("");

  const handlePinChange = (e) => {
    setPin(e.target.value);
  };

  const handleSavePin = () => {
    onSavePin(pin);
    onClose();
  };
  

  return (
    <div
      className={`fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center ${isOpen ? "" : "hidden"}`}
    >
      <div className="modal-overlay absolute inset-0 bg-gray-900 opacity-50 z-10"></div>
      <div className="modal-content bg-white p-4 rounded-md shadow-lg relative z-20 w-3/5 h-2/5">
        <h2 className="text-xl font-bold mb-4">Create PIN for Security</h2>
        <form onSubmit={handleSavePin}>
          <input
            type="password"
            id="pin"
            value={pin}
            onChange={handlePinChange}
            className="border border-gray-300 rounded-md p-2 w-full mb-4"
            required
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Save PIN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PinModal;
