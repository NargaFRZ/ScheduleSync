const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const pool = require("../db");

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const registerUser = async (req, res) => {
};

const loginUser = async (req, res) => {
};

module.exports = {
  registerUser,
  loginUser,
};
