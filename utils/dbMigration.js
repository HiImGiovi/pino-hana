import hanaInit, { getConnectionFromPool } from "./db.js";

const schema = process.env.SCHEMA || "PINOHANA";
const logTable = schema + "." + (process.env.LOGTABLE || "LOGS");

async function doMigrations() {
  const connectionOptions = {
    host: "localhost",
    port: 39017,
    uid: "SYSTEM",
    password: "Password1!",
  };
  hanaInit(connectionOptions);
  const dbConnection = await getConnectionFromPool();
  createSchema(dbConnection, schema);
  createLogTable(dbConnection, {
    tableName: logTable,
  });
}

function createSchema(conn, schemaName = "PINOHANA") {
  console.log("CREATING SCHEMA", schemaName);
  try {
    const query = `
        CREATE SCHEMA ${schemaName}`;
    const result = conn.exec(query);
    return result;
  } catch (error) {
    if (error.code === 386) console.log(`${schemaName} ALREADY EXISTENT`);
    else console.log(error);
  }
}

/**
 *
 * @param {import("@sap/hana-client").Connection} conn
 * @param {*} param1
 */
function createLogTable(conn, { tableName = "PINOHANA.LOGS" }) {
  try {
    console.log("CREATING LOG TABLE AT", tableName);
    const query = `
            CREATE TABLE ${tableName}
            (
            ID NVARCHAR(40) PRIMARY KEY,
            MSG NVARCHAR(5000),
            CREATEDAT TIMESTAMP,
            LEVEL INT
            )`;
    return conn.exec(query);
  } catch (error) {
    if (error.code === 288) {
      console.log(`${tableName} already existent, dropping and recreating`);
      const dropQuery = `
      DROP TABLE ${tableName}
      `;
      conn.exec(dropQuery);
      createLogTable(conn, tableName);
    } else console.error(error);
  }
}

console.log("Migration started...");
await doMigrations();
console.log("Migration executed successfully");
