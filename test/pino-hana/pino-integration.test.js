import { assert } from "chai";
import { getPinoLogger } from "../../utils/setupPino.js";
describe("index tests", () => {
  it("should pass", () => {});
  it("should log something and find the log in hana database", async () => {
    const logger = getPinoLogger();
    logger.info("ciao a");
    logger.info("ciao a");
  });
});
