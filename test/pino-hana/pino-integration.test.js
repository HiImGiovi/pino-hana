import { assert } from "chai";
import { getPinoLogger } from "../../utils/setupPino.js";
import { getConnectionFromPool } from "../../utils/db.js";
describe("index tests", () => {
  it("should pass", () => {});
  it("should log something and find the log in hana database", async () => {
    const logger = getPinoLogger();
    const numberOfLogs = 1000;
    for (let i = 0; i < numberOfLogs; i++) {
      logger.info(`log ${i + 1}`);
    }
    const schema = process.env.SCHEMA || "PINOHANA";
    const logTable = schema + "." + (process.env.LOGTABLE || "LOGS");
    const dbConnection = await getConnectionFromPool();
    setTimeout(() => {
      const logs = dbConnection.exec(`SELECT * FROM ${logTable}`);
      assert.equal(logs.length, 1000);
    }, 10000);
  });
});
