const pool = require('../db');
const {
  getLoggedInUserId,
} = require("./usersession");

// Fungsi untuk mengunggah jadwal baru
const uploadSchedule = async (req, res) => {
  const scheduleData  = req.body;
  owner = getLoggedInUserId(req);
  console.log("owner:",owner);
  console.log("schedule data:",scheduleData);
  try {
    const newSchedule = await pool.query(
      "INSERT INTO Schedules (owner, scheduledata) VALUES ($1, $2) RETURNING *",
      [owner, scheduleData]
    );
    
    res.status(201).json({ message: "Schedule uploaded successfully", schedule: newSchedule.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Fungsi untuk memperbarui jadwal
const updateSchedule = async (req, res) => {
  const { scheduleID, scheduleData } = req.body;

  try {
    const updatedSchedule = await pool.query(
      "UPDATE Schedules SET scheduleData = $1, isValidated = $2 WHERE scheduleID = $3 RETURNING *",
      [scheduleData, true, scheduleID]
    );

    if (updatedSchedule.rows.length === 0) {
      return res.status(404).json({ error: "Schedule not found" });
    }

    res.status(200).json({ message: "Schedule updated successfully", schedule: updatedSchedule.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Fungsi untuk menghapus jadwal
const deleteSchedule = async (req, res) => {
  const { scheduleID } = req.body;

  try {
    const deletedSchedule = await pool.query(
      "DELETE FROM Schedules WHERE scheduleID = $1 RETURNING *",
      [scheduleID]
    );

    if (deletedSchedule.rows.length === 0) {
      return res.status(404).json({ error: "Schedule not found" });
    }

    res.status(200).json({ message: "Schedule deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Fungsi untuk mengambil jadwal berdasarkan owner (userID)
const getSchedulesByOwner = async (req, res) => {
  const owner  = getLoggedInUserId(req);
  console.log(owner);
  try {
    const schedules = await pool.query(
      "SELECT * FROM Schedules WHERE owner = $1",
      [owner]
    );
    // console.log(req.params);
    // console.log(schedules);
    // console.log(schedules.rows);
    if (schedules.rows.length === 0) {
      return res.status(404).json({ error: "No schedules found for this user" });
    }

    res.status(200).json({ schedules: schedules.rows });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

const getSchedulesById = async (req, res) => {
  const scheduleId = req.params.scheduleid; // Access scheduleId from the request parameters
  console.log(scheduleId);
  try {
    const schedules = await pool.query(
      "SELECT * FROM Schedules WHERE scheduleid = $1",
      [scheduleId] // Use scheduleId in the query
    );

    if (schedules.rows.length === 0) {
      return res.status(404).json({ error: "No schedules found for this schedule ID" });
    }

    res.status(200).json({ schedules: schedules.rows });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};


module.exports = {
  uploadSchedule,
  updateSchedule,
  deleteSchedule,
  getSchedulesByOwner,
  getSchedulesById
};
