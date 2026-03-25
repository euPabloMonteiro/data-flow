import pino from "pino";

type LoggerConfig = {
  nodeEnv: string;
  logLevel: string;
};

export const createLogger = (serviceName: string, config: LoggerConfig) => {
  const isDevelopment = config.nodeEnv === "development";

  return pino({
    name: serviceName,
    level: config.logLevel,
    transport: isDevelopment
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
          },
        }
      : undefined,
  });
};
