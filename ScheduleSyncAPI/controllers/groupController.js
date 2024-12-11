const pool = require("../db");
const { getLoggedInUserId } = require("./usersession");

// Fungsi untuk mengenerate invite code 6 karakter acak
function generateInviteCode() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

// Fungsi untuk membuat grup baru
const createGroup = async (req, res) => {
  const { groupName } = req.body;
  const createdBy = getLoggedInUserId(req);
  const inviteCode = generateInviteCode();

  try {
    const newGroup = await pool.query(
      "INSERT INTO Groups (groupName, inviteCode, created_by) VALUES ($1, $2, $3) RETURNING *",
      [groupName, inviteCode, createdBy]
    );

    res
      .status(201)
      .json({ message: "Group created successfully", group: newGroup.rows[0] });

    const joinGroup = await pool.query(
      "INSERT INTO GroupMembers (groupID, userID) VALUES ($1, $2)",
      [newGroup.rows[0].groupid, createdBy]
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Fungsi untuk menambahkan anggota ke grup
const addMember = async (req, res) => {
  const { groupID, userID } = req.body;

  try {
    await pool.query(
      "INSERT INTO GroupMembers (groupID, userID) VALUES ($1, $2)",
      [groupID, userID]
    );

    res.status(200).json({ message: "Member added successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Fungsi untuk menghapus anggota dari grup
const removeMember = async (req, res) => {
  const { groupID, userID } = req.body;

  try {
    await pool.query(
      "DELETE FROM GroupMembers WHERE groupID = $1 AND userID = $2",
      [groupID, userID]
    );

    res.status(200).json({ message: "Member removed successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Fungsi untuk menghapus grup
const deleteGroup = async (req, res) => {
  const { groupID } = req.body;

  try {
    await pool.query("DELETE FROM Groups WHERE groupID = $1", [groupID]);

    res.status(200).json({ message: "Group deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Fungsi untuk menyinkronkan jadwal anggota dalam grup
const syncSchedules = async (req, res) => {
  const { groupID } = req.body;

  try {
    // Ambil data jadwal anggota grup
    const schedules = await pool.query(
      "SELECT Schedules.scheduleData FROM Schedules " +
        "JOIN GroupMembers ON Schedules.owner = GroupMembers.userID " +
        "WHERE GroupMembers.groupID = $1",
      [groupID]
    );

    if (schedules.rows.length === 0) {
      return res
        .status(404)
        .json({ error: "No schedules found for the given group ID" });
    }

    console.log("Schedules raw data:", schedules.rows);

    // Parse data jadwal ke dalam format JSON
    const allSchedules = schedules.rows
      .map((row) => {
        try {
          if (typeof row.scheduledata === "string") {
            return JSON.parse(row.scheduledata); // Jika data adalah string JSON
          } else if (typeof row.scheduledata === "object") {
            return row.scheduledata; // Jika data sudah berupa objek
          } else {
            throw new Error("Invalid scheduleData format");
          }
        } catch (err) {
          console.error("Failed to parse scheduleData:", err.message);
          return null;
        }
      })
      .filter((data) => data !== null); // Hanya jadwal yang berhasil diparsing

    console.log("Parsed schedules:", allSchedules);

    if (allSchedules.length === 0) {
      return res
        .status(400)
        .json({ error: "No valid schedules found for synchronization" });
    }

    // Gabungkan semua jadwal berdasarkan hari
    const weeklySchedule = mergeWeeklySchedules(allSchedules);

    // Temukan waktu luang per hari
    const freeTime = findFreeTime(weeklySchedule);

    // Simpan hasil sinkronisasi
    const newSync = await pool.query(
      "INSERT INTO SyncedSchedules (groupID, syncedData) VALUES ($1, $2) RETURNING *",
      [groupID, JSON.stringify({ weeklySchedule, freeTime })]
    );

    res
      .status(200)
      .json({
        message: "Schedules synced successfully",
        sync: newSync.rows[0],
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Fungsi untuk menggabungkan jadwal mingguan dari semua anggota
function mergeWeeklySchedules(allSchedules) {
  const mergedSchedule = {};

  allSchedules.forEach((userSchedule) => {
    // Iterasi melalui hari (Monday, Tuesday, ...)
    Object.keys(userSchedule).forEach((day) => {
      if (!mergedSchedule[day]) {
        mergedSchedule[day] = [];
      }
      // Gabungkan event dari setiap hari
      mergedSchedule[day] = mergedSchedule[day].concat(userSchedule[day]);
    });
  });

  // Urutkan jadwal per hari berdasarkan waktu mulai
  for (const day in mergedSchedule) {
    mergedSchedule[day].sort(
      (a, b) =>
        new Date(`1970-01-01T${a.startTime}`) -
        new Date(`1970-01-01T${b.startTime}`)
    );
  }

  return mergedSchedule;
}

// Fungsi untuk menemukan waktu luang per hari
function findFreeTime(weeklySchedule) {
  const freeTime = {};

  for (const day in weeklySchedule) {
    const daySchedule = weeklySchedule[day];
    const dayFreeTime = [];
    let currentEnd = "00:00:00";

    daySchedule.forEach((event) => {
      if (currentEnd < event.startTime) {
        dayFreeTime.push({ startTime: currentEnd, endTime: event.startTime });
      }
      currentEnd = currentEnd > event.endTime ? currentEnd : event.endTime;
    });

    // Tambahkan waktu luang dari akhir jadwal terakhir hingga 24:00
    if (currentEnd < "24:00:00") {
      dayFreeTime.push({ startTime: currentEnd, endTime: "24:00:00" });
    }

    freeTime[day] = dayFreeTime;
  }

  return freeTime;
}

// Fungsi untuk mengambil member grup dan melihat status sudah set schedule atau belum
const getGroupMembers = async (req, res) => {
  const { groupID } = req.params;

  try {
    const members = await pool.query(
      "SELECT Users.username, GroupMembers.userID, " +
        "CASE WHEN Schedules.scheduleData IS NOT NULL THEN true ELSE false END AS hasSchedule " +
        "FROM Users " +
        "JOIN GroupMembers ON Users.userID = GroupMembers.userID " +
        "LEFT JOIN Schedules ON Users.userID = Schedules.owner " +
        "WHERE GroupMembers.groupID = $1",
      [groupID]
    );

    if (members.rows.length === 0) {
      return res
        .status(404)
        .json({ error: "No members found for the given group ID" });
    }

    res.status(200).json({ members: members.rows });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Fungsi untuk join grup menggunakan invite code
const joinGroup = async (req, res) => {
  const { inviteCode, userID } = req.body;

  try {
    // Cari grup berdasarkan inviteCode
    const group = await pool.query(
      "SELECT groupID FROM Groups WHERE inviteCode = $1",
      [inviteCode]
    );
    console.log(group.rows);

    if (group.rows.length === 0) {
      return res.status(404).json({ error: "Invalid invite code" });
    }

    const groupID = group.rows[0].groupid;
    console.log(groupID);

    // Tambahkan anggota ke grup
    await pool.query(
      "INSERT INTO GroupMembers (groupID, userID) VALUES ($1, $2)",
      [groupID, userID]
    );

    res.status(200).json({ message: "Joined group successfully", groupID });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Fungsi untuk mengambil synced schedule berdasarkan groupID
const getSyncedSchedule = async (req, res) => {
  const { groupID } = req.params;

  try {
    const syncedSchedule = await pool.query(
      "SELECT syncedData FROM SyncedSchedules WHERE groupID = $1",
      [groupID]
    );

    if (syncedSchedule.rows.length === 0) {
      return res
        .status(404)
        .json({ error: "No synced schedule found for the given group ID" });
    }

    res
      .status(200)
      .json({ syncedSchedule: JSON.parse(syncedSchedule.rows[0].synceddata) });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

const getAllGroups = async (req, res) => {
  try {
    const groups = await pool.query(
      "SELECT * FROM Groups ORDER BY created_at DESC"
    );

    if (groups.rows.length === 0) {
      return res.status(404).json({ error: "No groups found" });
    }

    res.status(200).json({ groups: groups.rows });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createGroup,
  addMember,
  removeMember,
  syncSchedules,
  deleteGroup,
  getGroupMembers,
  joinGroup,
  getSyncedSchedule,
  getAllGroups,
};
