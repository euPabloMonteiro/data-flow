import { Request, Response } from "express";
import { AnalyticsService } from "./analytics.service";

export class AnalyticsController {
  async handle(_: Request, res: Response) {
    const service = new AnalyticsService();
    const data = await service.execute();
    res.json(data);
  }
}
