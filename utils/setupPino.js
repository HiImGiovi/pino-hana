import pino from "pino";
import path from "path";

let logger;

async function setupPino() {
  const pinoHanaTransport = pino.transport({
    target: path.resolve("./index.js"),
    options: {
      connectionOptions: {
        host: "localhost",
        port: 39017,
        user: "SYSTEM",
        password: "Password1!",
      },
      schema: process.env.SCHEMA || "PINOHANA",
      table: process.env.LOGTABLE || "LOGS",
    },
  });
  logger = pino(pinoHanaTransport);
}
/**
 * Returns a pino logger.
 * @returns {import("pino").Logger}
 */
function getPinoLogger() {
  if (!logger) setupPino();
  return logger;
}

export { getPinoLogger as default, getPinoLogger, setupPino };
