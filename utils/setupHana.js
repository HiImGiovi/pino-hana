import { init, getConnectionFromPool, clearPool } from "./db.js";

const schemaName = "PINOHANA";
const tableName = `${schemaName}.LOGS`;

async function setupHana() {
  const connectionOptions = {
    host: "localhost",
    port: 39017,
    uid: "SYSTEM",
    password: "Password1!",
  };
  init(connectionOptions);
  const dbConnection = await getConnectionFromPool();

  const schemaResult = createSchema(dbConnection, schemaName);

  const tableCreationResult = createLogTable(dbConnection, {
    tableName,
  });
  dbConnection.close();
}

async function clearHana() {
  const dbConnection = await getConnectionFromPool();
  const result = dropSchema(dbConnection, schemaName);
  dbConnection.close();
  clearPool();
}
function createSchema(conn, schemaName = "PINOHANA") {
  const query = `
    CREATE SCHEMA ${schemaName}`;
  return conn.exec(query);
}

/**
 *
 * @param {import("@sap/hana-client").Connection} conn
 * @param {*} param1
 */
function createLogTable(conn, { tableName = "PINOHANA.LOGS" }) {
  const query = `
    CREATE TABLE ${tableName}
    (
    ID NVARCHAR(40) PRIMARY KEY,
    MSG NVARCHAR(5000),
    CREATEDAT TIMESTAMP
    )`;
  return conn.exec(query);
}
function dropSchema(conn, schemaName = "PINOHANA") {
  const query = `DROP SCHEMA ${schemaName} CASCADE`;
  return conn.exec(query);
}

export { setupHana, clearHana, setupHana as default };
