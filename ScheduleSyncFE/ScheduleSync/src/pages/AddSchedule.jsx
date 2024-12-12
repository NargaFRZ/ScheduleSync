import React, { useRef, useState } from "react";
import NavBar from "../components/NavBarLogout";
import arrow from "../assets/icons/ArrowVector.svg";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { imageDb } from "../actions/firebase";
import { v4 } from "uuid";
import { fetchUserData } from "../actions/account.actions";
import { uploadSchedule } from "../actions/schedule.actions";
import { getSchedulesByOwner } from "../actions/schedule.actions";

const AddSchedule = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null); // Reference to the file input
  const [formData, setFormData] = useState({}); // State to store form data
  const [imagePreview, setImagePreview] = useState(""); // State for image preview

  const handleFileInputClick = () => {
    fileInputRef.current.click(); // Programmatically trigger the file input
  };

  const handleFileChange = async (event) => {
    const files = event.target.files; // Access selected files
    if (files.length > 0) {
      const file = files[0]; // Get the first file
      try {
        // Upload file to Firebase
        const ImageRef = ref(imageDb, `files/${v4()}`);
        await uploadBytes(ImageRef, file);
        const fileURL = await getDownloadURL(ImageRef);

        // Update form data with file URL
        const updatedFormData = { ...formData, file_path: fileURL };
        setFormData(updatedFormData);
        setImagePreview(fileURL); // Set image preview

        console.log("File uploaded successfully:", fileURL);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleAddSchedule = async () => {
    try {
      const userResponse = await fetchUserData();
      const userId = userResponse?.data.userid; // Extract user ID from response

      if (!userId || !formData.file_path) {
        console.error("User ID or file path is missing.");
        return;
      }

      const payload = {
        userId,
        metadata: {
          url: formData.file_path,
        },
      };

      await uploadSchedule(payload);
      console.log("Schedule uploaded successfully");
      navigate("/yourschedule"); // Navigate to schedule page
    } catch (error) {
      console.error("Error uploading schedule:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-blue-900">
      {/* Navigation Bar */}
      <NavBar />

      {/* Layout Wrapper */}
      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <aside className="absolute top-8 left-8 h-auto w-64 bg-blue-900 text-white flex flex-col px-6 py-8 rounded-2xl shadow-lg">
          <h1 className="text-2xl font-semibold mb-6">Add Your Image Files</h1>
          <button
            className="w-full bg-white text-blue-900 py-2 px-4 rounded-lg font-medium flex items-center justify-between hover:bg-blue-300"
            onClick={handleFileInputClick} // Open file explorer
          >
            Upload Ulang
            <img src={arrow} alt="Arrow icon" className="h-4 w-4" />
          </button>
          <button
            className="w-full bg-white text-blue-900 py-2 px-4 rounded-lg font-medium flex items-center justify-between mt-4 hover:bg-blue-300"
            onClick={handleAddSchedule} // Add to schedule
          >
            Add to Schedule
            <img src={arrow} alt="Arrow icon" className="h-4 w-4" />
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-8 py-6 ml-80">
          <h1 className="text-4xl font-semibold mb-6">Add Schedules</h1>
          {/* Placeholder for Image */}
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-blue-300 rounded-lg w-3/4 h-80">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Uploaded Preview"
                className="object-contain w-full h-full"
              />
            ) : (
              <>
                <p className="text-gray-500">[Schedule Image Placeholder]</p>
                <p className="text-sm text-gray-400">
                  (Gambar akan diambil dari Firebase)
                </p>
              </>
            )}
          </div>

          {/* Add Button */}
          <button
            onClick={handleFileInputClick}
            className="mt-6 bg-blue-900 text-white py-2 px-6 rounded-lg font-medium flex items-center hover:bg-blue-700"
          >
            Add
            <span className="ml-2 text-xl font-bold">+</span>
          </button>
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFileChange} // Handle file selection
          />
        </main>
      </div>
    </div>
  );
};

export default AddSchedule;
