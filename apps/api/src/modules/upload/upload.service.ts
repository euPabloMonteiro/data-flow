import path from "path";
import { getFileProcessingQueue } from "@dataflow/queue";
import { UploadRepository } from "./upload.repository";
import { AppError } from "../../errors/AppError";
import { normalizeSaleErrors } from "@dataflow/validation";

export class CreateUploadService {
  constructor(private repository = new UploadRepository()) {}

  async execute(file: Express.Multer.File, userId: string) {
    const absolutePath = path.resolve(file.path);

    const upload = await this.repository.create({
      filename: file.filename,
      filepath: absolutePath,
      userId,
    });

    const job = await getFileProcessingQueue().add("fileProcessingJob", {
      uploadId: upload.id,
      filename: file.filename,
      path: absolutePath,
    });

    return {
      uploadId: upload.id,
      jobId: job.id as string,
    };
  }
}

export class GetUploadService {
  private uploadRepository = new UploadRepository();

  async getById(id: string, userId: string) {
    const upload = await this.uploadRepository.findByIdAndUserId(id, userId);

    if (!upload) {
      throw new AppError("Upload not found.", 404);
    }

    return upload;
  }

  async getAll(userId: string) {
    const uploads = await this.uploadRepository.findAllByUserId(userId);
    return uploads;
  }
}

export class GetUploadErrorsService {
  constructor(private repository = new UploadRepository()) {}

  async execute(id: string, userId: string) {
    const upload = await this.repository.findByIdAndUserId(id, userId);

    if (!upload) {
      throw new AppError("Upload not found.", 404);
    }

    const errors = await this.repository.findErrorsById(id);
    const normalized = normalizeSaleErrors(errors ?? []);

    return {
      uploadId: id,
      totalErrors: normalized.length,
      errors: normalized,
    };
  }
}
