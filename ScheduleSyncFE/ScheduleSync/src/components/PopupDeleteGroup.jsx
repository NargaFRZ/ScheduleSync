import React from "react";
import { deleteGroup } from "../actions/group.actions";

const PopupDeleteGroup = ({ onClose, group, onDeleteGroup }) => {
  const handleDelete = async () => {
    const response = await deleteGroup(group._id);
    if (response.success) {
      onDeleteGroup(group._id); // Notify parent of successful deletion
      onClose(); // Close the popup
    } else {
      console.error("Error deleting group:", response.data);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <div className="text-center">
          <div className="mb-4">
            <span className="text-red-500 text-4xl">&#9888;</span>
          </div>
          <h2 className="text-xl font-semibold mb-2">Delete this group permanently?</h2>
          <p className="text-gray-600 mb-6">
            This action cannot be undone. This will permanently delete your group
            and its entries. All members of the group will be removed.
          </p>
        </div>
        <div className="flex justify-center gap-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400"
            onClick={handleDelete}
          >
            Permanently delete group
          </button>
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupDeleteGroup;