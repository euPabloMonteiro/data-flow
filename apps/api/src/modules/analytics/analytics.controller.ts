import { Controller, Route, Get, Security, Request } from "tsoa";
import { AnalyticsService } from "./analytics.service";
import { AuthenticatedRequest } from "../../middleware/auth.middleware";
import type { AnalyticsResponseDTO } from "@dataflow/types";

@Route("analytics")
@Security("jwt")
export class AnalyticsController extends Controller {
  @Get("/")
  async handle(
    @Request() req: AuthenticatedRequest,
  ): Promise<AnalyticsResponseDTO> {
    const userId = req.user.sub;
    return await new AnalyticsService().execute(userId);
  }
}
