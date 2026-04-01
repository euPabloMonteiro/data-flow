import { Controller, Route, Get } from "tsoa";

interface HealthResponse {
  status: string;
  timestamp: string;
}

@Route("health")
export class HealthController extends Controller {
  @Get("/")
  async getHealth(): Promise<HealthResponse> {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
    };
  }
}
