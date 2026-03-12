import { Router } from "express";
import { UploadFileController } from "./modules/upload/upload.controller";
import { AnalyticsController } from "./modules/analytics/analytics.controller";
import { upload } from "./lib/multer";

export const router = Router();
const uploadController = new UploadFileController();
const analyticsController = new AnalyticsController();

router.post("/upload", upload.single("file"), uploadController.handle);
router.get("/analytics", analyticsController.handle);
