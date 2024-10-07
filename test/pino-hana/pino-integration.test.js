import { assert } from "chai";
import { getPinoLogger } from "../../utils/setupPino.js";
import { getConnectionFromPool } from "../../utils/db.js";
import { clearHana, setupHana } from "../../utils/setupHana.js";
import { setupPino } from "../../utils/setupPino.js";

describe("index tests", function () {
  before(async function () {
    console.log("Setting up pino logger...");
    const connectionOptions = {
      host: "localhost",
      port: 39017,
      uid: "SYSTEM",
      password: "Password1!",
    };
    await setupHana(connectionOptions);
    await setupPino();
  });

  after(async function () {
    console.log("Cleaning hana...");
    setTimeout(async () => {
      await clearHana();
    }, 1);
  });

  it("should pass", function () {});

  it("should log something and find the log in hana database", async function () {
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
