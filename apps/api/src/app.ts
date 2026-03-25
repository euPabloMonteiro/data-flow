import { errorMiddleware } from "./middleware/error.middleware";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "./routes";
import { env } from "./env";

const app = express();

app.use(
  cors({
    origin: env.AUTH_REDIRECT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);
app.use(errorMiddleware);

export { app };
