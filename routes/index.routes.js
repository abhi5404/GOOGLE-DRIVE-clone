const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + '-' + file.originalname);
  },
});
const upload = multer({ storage });
const { saveFileMetadata, listFiles } = require('../controllers/file.controller');

router.get('/home', (req, res) => {
  res.render('home');
});

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
    const saved = await saveFileMetadata(req.file, req.user ? req.user._id : null);
    res.json({ success: true, file: saved });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ success: false, message: 'Server error while saving file' });
  }
});

router.get('/files', async (req, res) => {
  try {
    const files = await listFiles(100);
    res.json({ success: true, files });
  } catch (err) {
    console.error('List files error:', err);
    res.status(500).json({ success: false, message: 'Server error fetching files' });
  }
});

module.exports = router;