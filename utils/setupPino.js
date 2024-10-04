import pino from "pino";
import path from "path";

let logger;

function setupPino() {
  const pinoHanaTransport = pino.transport({
    target: path.resolve("./index.js"),
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
