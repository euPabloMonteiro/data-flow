import { Router } from "express";
import { UploadFileController } from "./modules/upload/upload.controller";
import { upload } from "./lib/multer";

export const router = Router();
const controller = new UploadFileController();

router.post("/upload", upload.single("file"), controller.handle);
