import IORedis from "ioredis";

type RedisConfig = {
  host: string;
  port: number;
};

let redis: IORedis | null = null;
let redisConfig: RedisConfig | null = null;

export function initializeRedisConnection(config: RedisConfig) {
  redisConfig = config;
}

function getRedisConfig() {
  if (!redisConfig) {
    throw new Error("Redis config was not initialized");
  }

  return redisConfig;
}

export function getRedis() {
  const config = getRedisConfig();

  if (!redis) {
    redis = new IORedis({
      host: config.host,
      port: config.port,
      maxRetriesPerRequest: null,
      retryStrategy: (times) => {
        if (times > 5) {
          console.error("Redis Connection failed after retries.");
          return null;
        }

        return Math.min(times * 1000, 5000);
      },
    });

    redis.on("error", (err) => {
      console.error("Redis error: ", err.message);
    });
  }

  return redis;
}

export async function connectRedis() {
  try {
    const redis = getRedis();
    await redis.ping();
    console.log("Redis Connected");
  } catch (error) {
    console.error("Redis Connection Failed:", error);
    throw error;
  }
}
