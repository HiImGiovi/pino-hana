import build from "pino-abstract-transport";
import SonicBoom from "sonic-boom";
import { once } from "events";
import hdb from "hdb";
import { randomUUID } from "crypto";

export default async function (opts) {
  if (!opts.connectionOptions)
    throw new Error("Please provide connectionOptions to pino-hana transport.");
  const hanaClient = hdb.createClient(opts.connectionOptions);
  await new Promise((resolve, reject) =>
    hanaClient.connect((err) => {
      if (err) reject(err);
      resolve();
    })
  );
  const { table, schema } = opts;
  // console.log(result);
  const destination = new SonicBoom({
    dest: opts.destination || 1,
    sync: false,
  });
  await once(destination, "ready");

  return build(
    async function (source) {
      for await (let obj of source) {
        const toDrain = !destination.write(obj.msg + "\n");
        insertLog(hanaClient, `${schema}.${table}`, obj.msg);
        // This block will handle backpressure
        if (toDrain) {
          await once(destination, "drain");
        }
      }
    },
    {
      async close() {
        destination.end();
        await once(destination, "close");
      },
    }
  );
}

function insertLog(dbClient, into, msg) {
  const query = `
    INSERT INTO ${into}
    (
      ID,
      MSG,
      CREATEDAT
    )
    VALUES
    (
      '${randomUUID()}',
      '${msg}',
      '${new Date().toISOString()}'
    )`;
  dbClient.exec(query, (err) => {
    if (err) console.error(err);
  });
}
