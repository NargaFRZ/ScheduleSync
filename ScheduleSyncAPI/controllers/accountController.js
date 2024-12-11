const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const pool = require("../db");
const { setLoggedInUserId, getLoggedInUserId } = require("./usersession");

// Fungsi validasi email
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  if (!validateEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      "INSERT INTO Users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query("SELECT * FROM Users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.rows[0].password);

    if (!isMatch) {
      return res.status(400).json({ error: "Incorrect password" });
    }
    const LoggedInId = user.rows[0].userid;
    setLoggedInUserId(req, LoggedInId);
    console.log(LoggedInId);
    res.status(200).json({ message: "Login successful", user: user.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};
const editUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate email format
  if (!validateEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  try {
    let query = "UPDATE Users SET username = $1, email = $2";
    const values = [username, email];

    // Check if password is provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      query += ", password = $3";
      values.push(hashedPassword);
    }

    query += " WHERE email = $2 RETURNING *";

    const updatedUser = await pool.query(query, values);

    if (updatedUser.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser.rows[0],
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

const deleteUser = async (req, res) => {
  const { email } = req.body;

  try {
    const deletedUser = await pool.query(
      "DELETE FROM Users WHERE email = $1 RETURNING *",
      [email]
    );

    if (deletedUser.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

const getUserbyId = async (req, res) => {
  try {
    let currentId;
    if (getLoggedInUserId(req)) {
      currentId = getLoggedInUserId(req);
    } else {
      return res.status(440).send("Login session expired");
    }
    current = await pool.query("SELECT * FROM Users WHERE userid = $1", [
      currentId,
    ]);
    if (current.rows.length == 0) {
      return res.status(404).send("Account Not Found");
    }
    res.status(200).send(current.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  registerUser,
  loginUser,
  editUser,
  deleteUser,
  getUserbyId,
};
