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

    // Semua ini berjalan dalam bentuk asumsi, asumsi ini jalan
    const syncedData = schedules.rows.map(row => row.scheduleData);

    // Simpan hasil sinkronisasi ke dalam tabel `SyncedSchedules`
    const newSync = await pool.query(
      "INSERT INTO SyncedSchedules (groupID, syncedData) VALUES ($1, $2) RETURNING *",
      [groupID, JSON.stringify(syncedData)]
    );

    res.status(200).json({ message: "Schedules synced successfully", sync: newSync.rows[0] });
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
};
