import pino from "pino";

const isDevelopment = process.env.NODE_ENV === "development";

export const createLogger = (serviceName: string) => {
  return pino({
    name: serviceName,
    level: process.env.LOG_LEVEL || "info",
    transport: isDevelopment
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            // ignore: "pid,hostname",
            // translateTime: "HH:MM:ss Z",
          },
        }
      : undefined,
  });
};
