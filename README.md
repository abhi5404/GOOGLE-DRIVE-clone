# Google Drive Clone

Simple upload demo that stores files on disk and metadata in MongoDB.

Setup

1. Copy `.env.example` to `.env` and set `MONGO_URI`.
2. npm install
3. npm start
4. Open http://localhost:3000/home

Notes

- Uploaded files are saved to `/uploads` and served at `/uploads/<filename>`.
- File metadata is stored in MongoDB in the `files` collection.
- For production, consider using S3 or another object storage and secure file validation.
