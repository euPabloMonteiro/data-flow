import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (_, file, cb) => {
    if (!fs.existsSync("uploads")) {
      fs.mkdirSync("uploads");
    }
    const unique = Date.now() + "-" + Math.random();
    cb(null, unique + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });
