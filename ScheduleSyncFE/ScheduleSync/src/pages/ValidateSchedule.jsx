import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBarLogout";
import arrow from "../assets/icons/ArrowVector.svg";
import { getSchedulesById, OCRSchedule } from "../actions/schedule.actions";

const ValidateSchedule = () => {
  const navigate = useNavigate();
  const { scheduleid } = useParams(); // Extract the id parameter from the URL
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        // First, call getSchedulesById to fetch the schedule data
        const scheduleResponse = await getSchedulesById(scheduleid);
        console.log("Schedule response:", scheduleResponse);

        if (scheduleResponse.data.schedules && scheduleResponse.data.schedules.length > 0) {
          const scheduleURL = scheduleResponse.data.schedules[0].scheduledata.metadata.url;
          console.log("Schedule URL:", scheduleURL);

          // Second, call OCRSchedule with the extracted URL
          const ocrResponse = await OCRSchedule(scheduleURL);
          console.log("OCRSchedule response:", ocrResponse);

          // Set the fetched schedule data to state
          if (ocrResponse && ocrResponse.data.schedules) {
            setScheduleData(ocrResponse.data.schedules);
          }
        } else {
          console.error("No schedules found for this ID.");
        }
      } catch (error) {
        console.error("Error fetching schedule or calling OCRSchedule:", error);
      }
    };

    fetchSchedule(); // Fetch the schedule when the component mounts
  }, [scheduleid]);

  // Helper function to format time to HH.MM-HH.MM
  const formatTime = (timeString) => {
    const timeParts = timeString.split("-");
    const startTime = timeParts[0].slice(0, 2) + "." + timeParts[0].slice(2);
    const endTime = timeParts[1].slice(0, 2) + "." + timeParts[1].slice(2);
    return `${startTime}-${endTime}`;
  };

  // Group schedule data by day and time
  const groupedSchedule = scheduleData.reduce((acc, { day, time, class_name, room }) => {
    const formattedTime = formatTime(time);
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push({ class_name, room, time: formattedTime });
    return acc;
  }, {});

  // Render the table of the schedule
  const daysOfWeek = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];
  const timeSlots = [
    "07.00-09.30", "08.00-09.50", "10.00-11.40", "13.00-14.40", "16.00-18.30"
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-blue-900">
      <NavBar />
      <div className="flex flex-1 relative">
        <aside className="absolute top-8 left-8 h-auto w-64 bg-blue-900 text-white flex flex-col px-6 py-8 rounded-2xl shadow-lg">
          <h1 className="text-2xl font-semibold mb-6">Name of Schedule</h1>
          <button className="w-full bg-white text-blue-900 py-2 px-4 rounded-lg font-medium flex items-center justify-between hover:bg-blue-300">
            Upload Ulang
            <img src={arrow} alt="Arrow icon" className="h-4 w-4" />
          </button>
          <button className="w-full bg-white text-blue-900 py-2 px-4 rounded-lg font-medium flex items-center justify-between mt-4 hover:bg-blue-300">
            Save to Schedule
            <img src={arrow} alt="Arrow icon" className="h-4 w-4" />
          </button>
        </aside>

        <main className="flex-1 flex flex-col items-center justify-center px-8 py-6 ml-80">
          <h1 className="text-4xl font-semibold mb-6">Validate Schedule</h1>
          <table className="table-auto border-collapse w-full">
            <thead>
              <tr>
                <th className="border p-4">Time</th>
                {daysOfWeek.map((day) => (
                  <th key={day} className="border p-4">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((timeSlot) => (
                <tr key={timeSlot}>
                  <td className="border p-4">{timeSlot}</td>
                  {daysOfWeek.map((day) => {
                    const scheduleForDay = groupedSchedule[day]?.find((schedule) => schedule.time === timeSlot);
                    return (
                      <td key={day} className="border p-4">
                        {scheduleForDay ? (
                          <div>
                            <div>{scheduleForDay.class_name}</div>
                            <div>{scheduleForDay.room}</div>
                          </div>
                        ) : (
                          "No Class"
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
};

export default ValidateSchedule;
