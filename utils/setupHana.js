import { init, getConnectionFromPool, clearPool } from "./db.js";

const schema = process.env.SCHEMA || "PINOHANA";
const logTable = schema + "." + (process.env.LOGTABLE || "LOGS");

async function setupHana(
  connectionOptions = {
    host: "localhost",
    port: 39017,
    uid: "SYSTEM",
    password: "Password1!",
  }
) {
  init(connectionOptions);
}

async function clearHana() {
  const dbConnection = await getConnectionFromPool();
  const result = clearTable(dbConnection, logTable);
  dbConnection.close();
  clearPool();
}

function clearTable(conn, table = "PINOHANA.LOGS") {
  const query = `DELETE FROM ${table}`;
  return conn.exec(query);
}

export { setupHana, clearHana, setupHana as default };
