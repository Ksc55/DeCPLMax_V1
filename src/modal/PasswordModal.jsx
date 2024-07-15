import React, { useState } from "react";

function PasswordModal({ onClose, onConfirm }) {
  const [password, setPassword] = useState("");

  const handleConfirm = () => {
    onConfirm(password);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-2/5">
        <h2 className="text-xl mb-4">Enter your PIN</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-4 w-full"
          placeholder="Enter your PIN"
        />
        <div className="flex justify-end">
          <button onClick={handleConfirm} className="bg-blue-500 text-white p-2 rounded mr-2">Confirm</button>
          <button onClick={onClose} className="bg-gray-500 text-white p-2 rounded">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default PasswordModal;
