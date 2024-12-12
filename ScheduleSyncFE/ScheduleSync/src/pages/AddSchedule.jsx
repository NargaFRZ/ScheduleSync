import React, { useEffect, useRef, useState } from "react";
import NavBar from "../components/NavBarLogout";
import arrow from "../assets/icons/ArrowVector.svg";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { imageDb } from "../actions/firebase";
import { v4 } from "uuid";
import { fetchUserData } from "../actions/account.actions";
import { uploadSchedule, getSchedulesByOwner } from "../actions/schedule.actions";

const AddSchedule = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({});
  const [imagePreview, setImagePreview] = useState(""); // For image preview
  const [newestScheduleImageUrl, setNewestScheduleImageUrl] = useState(""); // For storing the latest schedule image URL

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const schedules = await getSchedulesByOwner();
        console.log(schedules);
        const newestSchedule = schedules.data.schedules.sort(
          (a, b) => new Date(b.uploaded_at) - new Date(a.uploaded_at)
        )[0];
        console.log("newest:",newestSchedule);

        // Check if the newest schedule has a valid image URL
        console.log("newest url:",newestSchedule.scheduledata.metadata.url);
        if (newestSchedule?.scheduledata?.metadata?.url) {
          setNewestScheduleImageUrl(newestSchedule.scheduledata.metadata.url);
        }
      } catch (error) {
        console.error("Error fetching schedules:", error);
      }
    };

    fetchSchedules(); // Fetch schedules when the component mounts
  }, []);

  const handleFileInputClick = () => {
    fileInputRef.current.click(); // Trigger the file input
  };

  const handleFileChange = async (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      try {
        const ImageRef = ref(imageDb, `files/${v4()}`);
        await uploadBytes(ImageRef, file);
        const fileURL = await getDownloadURL(ImageRef);

        const updatedFormData = { ...formData, file_path: fileURL };
        setFormData(updatedFormData);
        setImagePreview(fileURL); // Set image preview
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleAddSchedule = async () => {
    try {
      const userResponse = await fetchUserData();
      const userId = userResponse?.data.userid;
  
      // Check if userId and formData.file_path are available
      if (!userId) {
        console.error("User ID is missing.");
        return;
      }
  
      if (!formData.file_path) {
        console.error("File path is missing.");
        return;
      }
  
      const payload = {
        metadata: {
          url: formData.file_path,
        },
      };
  
      // Assuming uploadSchedule returns a boolean indicating success
      const uploadSuccess = await uploadSchedule(payload);
      console.log(uploadSuccess);
  
      if (uploadSuccess) {
        console.log("Schedule uploaded successfully");
        navigate("/yourschedule"); // Navigate to schedule page only if upload is successful
      } else {
        console.error("Failed to upload schedule.");
      }
    } catch (error) {
      console.error("Error uploading schedule:", error);
    }
  };
  
  

  return (
    <div className="min-h-screen flex flex-col bg-white text-blue-900">
      <NavBar />

      <div className="flex flex-1 relative">
        <aside className="absolute top-8 left-8 h-auto w-64 bg-blue-900 text-white flex flex-col px-6 py-8 rounded-2xl shadow-lg">
          <h1 className="text-2xl font-semibold mb-6">Add Your Image Files</h1>
          <button
            className="w-full bg-white text-blue-900 py-2 px-4 rounded-lg font-medium flex items-center justify-between hover:bg-blue-300"
            onClick={handleFileInputClick}
          >
            Upload Ulang
            <img src={arrow} alt="Arrow icon" className="h-4 w-4" />
          </button>
          <button
            className="w-full bg-white text-blue-900 py-2 px-4 rounded-lg font-medium flex items-center justify-between mt-4 hover:bg-blue-300"
            onClick={handleAddSchedule}
          >
            Add to Schedule
            <img src={arrow} alt="Arrow icon" className="h-4 w-4" />
          </button>
        </aside>

        <main className="flex-1 flex flex-col items-center justify-center px-8 py-6 ml-80">
          <h1 className="text-4xl font-semibold mb-6">Add Schedules</h1>

          {/* Image Placeholder or Image */}
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-blue-300 rounded-lg w-3/4 h-80">
            {imagePreview || newestScheduleImageUrl ? (
              <img
                src={imagePreview || newestScheduleImageUrl}
                alt="Uploaded Preview"
                className="object-contain w-full h-full"
              />
            ) : (
              <>
                <p className="text-gray-500">[Schedule Image Placeholder]</p>
                <p className="text-sm text-gray-400">(Gambar akan diambil dari Firebase)</p>
              </>
            )}
          </div>

          <button
            onClick={handleFileInputClick}
            className="mt-6 bg-blue-900 text-white py-2 px-6 rounded-lg font-medium flex items-center hover:bg-blue-700"
          >
            Add
            <span className="ml-2 text-xl font-bold">+</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </main>
      </div>
    </div>
  );
};

export default AddSchedule;
