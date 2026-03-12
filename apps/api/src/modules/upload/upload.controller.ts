import { Request, Response } from "express";
import { UploadFileService } from "./upload.service";

export class UploadFileController {
  async handle(req: Request, res: Response) {
    if (!req.file) {
      return res.status(400).json({ error: "file is required" });
    }

    const uploadFileService = new UploadFileService();
    const result = await uploadFileService.execute(req.file);

    return res.status(200).json(result);
  }
}
