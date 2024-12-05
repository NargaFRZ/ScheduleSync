const pool = require('../db');

// Fungsi untuk mengenerate invite code 6 karakter acak
function generateInviteCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

// Fungsi untuk membuat grup baru
const createGroup = async (req, res) => {
  const { groupName, createdBy } = req.body;
  const inviteCode = generateInviteCode();

  try {
    const newGroup = await pool.query(
      "INSERT INTO Groups (groupName, inviteCode, created_by) VALUES ($1, $2, $3) RETURNING *",
      [groupName, inviteCode, createdBy]
    );

    res.status(201).json({ message: "Group created successfully", group: newGroup.rows[0] });
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
    await pool.query(
      "DELETE FROM Groups WHERE groupID = $1",
      [groupID]
    );

    res.status(200).json({ message: "Group deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
}

// Fungsi untuk menyinkronkan jadwal anggota dalam grup
const syncSchedules = async (req, res) => {
  const { groupID } = req.body;

  try {
    // Ambil data jadwal anggota grup
    const schedules = await pool.query(
      "SELECT Schedules.scheduleData FROM Schedules JOIN GroupMembers ON Schedules.owner = GroupMembers.userID WHERE GroupMembers.groupID = $1",
      [groupID]
    );

    if (schedules.rows.length === 0) {
      return res.status(404).json({ error: "No schedules found for the given group ID" });
    }

    // Gabungkan jadwal menjadi satu array
    const allSchedules = schedules.rows.flatMap(row => JSON.parse(row.scheduleData));

    // Urutkan jadwal berdasarkan startTime
    allSchedules.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

    // Cari waktu overlap dan waktu luang
    const mergedSchedules = [];
    let current = allSchedules[0];

    for (let i = 1; i < allSchedules.length; i++) {
      const next = allSchedules[i];
      if (new Date(current.endTime) >= new Date(next.startTime)) {
        // Gabungkan overlap
        current.endTime = new Date(Math.max(new Date(current.endTime), new Date(next.endTime))).toISOString();
      } else {
        // Tambahkan ke hasil gabungan
        mergedSchedules.push(current);
        current = next;
      }
    }
    mergedSchedules.push(current); // Tambahkan jadwal terakhir

    // Temukan waktu luang
    const freeTime = [];
    for (let i = 1; i < mergedSchedules.length; i++) {
      const prevEnd = new Date(mergedSchedules[i - 1].endTime);
      const nextStart = new Date(mergedSchedules[i].startTime);
      if (prevEnd < nextStart) {
        freeTime.push({ startTime: prevEnd.toISOString(), endTime: nextStart.toISOString() });
      }
    }

    // Simpan hasil sinkronisasi
    const newSync = await pool.query(
      "INSERT INTO SyncedSchedules (groupID, syncedData) VALUES ($1, $2) RETURNING *",
      [groupID, JSON.stringify({ mergedSchedules, freeTime })]
    );

    res.status(200).json({ message: "Schedules synced successfully", sync: newSync.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

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
      return res.status(404).json({ error: "No members found for the given group ID" });
    }

    res.status(200).json({ members: members.rows });
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
  getGroupMembers
};
