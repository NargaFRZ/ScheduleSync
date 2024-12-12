import React from "react";

const PopupSaveEditGroup = ({ onClose, onSaveEditGroup }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <div className="text-center">
          <div className="mb-4">
            <span className="text-blue-500 text-4xl">&#x3f;</span>
          </div>
          <h2 className="text-xl font-semibold mb-2">Are you sure about saving your changes?</h2>
        </div>
        <div className="flex justify-center gap-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400"
            onClick={onSaveEditGroup}
          >
            Yes
          </button>
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupSaveEditGroup;