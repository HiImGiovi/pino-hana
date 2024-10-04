import { assert } from "chai";
import { getPinoLogger } from "../../utils/setupPino.js";
describe("index tests", () => {
  it("should pass", () => {});
  it("idk", () => {
    const logger = getPinoLogger();
    logger.info("ciao a");
  });
});
