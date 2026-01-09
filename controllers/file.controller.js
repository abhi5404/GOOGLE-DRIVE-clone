const File = require('../models/file.model');

async function saveFileMetadata(file, userId = null) {
  if (!file) throw new Error('No file provided');
  const record = new File({
    filename: file.filename,
    originalName: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
    url: '/uploads/' + file.filename,
    uploadedBy: userId || null,
  });
  await record.save();
  return record;
}

async function listFiles(limit = 50) {
  return File.find({}).sort({ createdAt: -1 }).limit(limit).lean();
}

module.exports = { saveFileMetadata, listFiles };
