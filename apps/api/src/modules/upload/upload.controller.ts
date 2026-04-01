import {
  Controller,
  Route,
  Get,
  Post,
  Path,
  Security,
  Request,
  Response,
  SuccessResponse,
  Middlewares,
} from "tsoa";
import {
  CreateUploadService,
  GetUploadService,
  GetUploadErrorsService,
} from "./upload.service";
import { UploadPresenter } from "./upload.presenter";
import { AuthenticatedRequest } from "../../middleware/auth.middleware";
import { upload } from "../../lib/multer";
import type {
  CreateUploadResponse,
  UploadResponseDTO,
  UploadErrorsResponseDTO,
} from "./upload.models";

@Route("uploads")
@Security("jwt")
export class UploadController extends Controller {
  @SuccessResponse("201", "Upload created")
  @Response("400", "Bad request - file required")
  @Post("/")
  @Middlewares(upload.single("file"))
  async create(
    @Request() req: AuthenticatedRequest,
  ): Promise<CreateUploadResponse> {
    if (!req.file) {
      throw { status: 400, message: "file is required" };
    }

    const userId = req.user.sub;
    return await new CreateUploadService().execute(req.file, userId);
  }

  @Get("/")
  async getAll(
    @Request() req: AuthenticatedRequest,
  ): Promise<UploadResponseDTO[]> {
    const userId = req.user.sub;
    const uploads = await new GetUploadService().getAll(userId);

    return UploadPresenter.toHTTPList(uploads);
  }

  @Get("/{id}")
  @Response("400", "Invalid ID format")
  @Response("404", "Upload not found")
  async getById(
    @Path() id: string,
    @Request() req: AuthenticatedRequest,
  ): Promise<UploadResponseDTO> {
    const userId = req.user.sub;
    const upload = await new GetUploadService().getById(id, userId);
    return UploadPresenter.toHTTP(upload);
  }

  @Get("/{id}/errors")
  @Response("400", "Invalid ID format")
  @Response("404", "Upload not found")
  async getErrors(
    @Path() id: string,
    @Request() req: AuthenticatedRequest,
  ): Promise<UploadErrorsResponseDTO> {
    const userId = req.user.sub;
    return await new GetUploadErrorsService().execute(id, userId);
  }
}
