const pool = require('../db');

// Halo Wen, bagian ini hanya asumsi, gapaham OCR

// Fungsi untuk memproses dan menyimpan hasil OCR
const processOCR = async (req, res) => {
  const { scheduleID, ocrEngineType, processedData } = req.body;

  try {
    const newOCR = await pool.query(
      "INSERT INTO OCRProcessing (scheduleID, ocrEngineType, processedData) VALUES ($1, $2, $3) RETURNING *",
      [scheduleID, ocrEngineType, processedData]
    );

    res.status(201).json({ message: "OCR processed and stored successfully", ocr: newOCR.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Fungsi untuk mengambil hasil OCR berdasarkan scheduleID
const getOCRByScheduleID = async (req, res) => {
  const { scheduleID } = req.params;

  try {
    const ocrResult = await pool.query(
      "SELECT * FROM OCRProcessing WHERE scheduleID = $1",
      [scheduleID]
    );

    if (ocrResult.rows.length === 0) {
      return res.status(404).json({ error: "No OCR data found for the given schedule ID" });
    }

    res.status(200).json({ ocr: ocrResult.rows });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  processOCR,
  getOCRByScheduleID,
};
