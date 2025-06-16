import multer from "multer";

// Di sini kita tidak simpan file ke lokal, karena kamu upload ke ImageKit nanti
const storage = multer.memoryStorage(); // simpan di memori, bukan file system

const upload = multer({ storage });

export default upload;
