import { createServer } from "node:http";
import { env } from "./config/env";
import { logger } from "./config/logger";
import { createApp } from "./app";
import { attachRealtime } from "./realtime";

const app = createApp();
const server = createServer(app);
attachRealtime(server);

server.listen(env.PORT, () => {
  logger.info({ port: env.PORT }, "StadiumOS AI API listening");
});
