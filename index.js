import build from "pino-abstract-transport";
import SonicBoom from "sonic-boom";
import { once } from "events";

export default async function (opts) {
  // SonicBoom is necessary to avoid loops with the main thread.
  // It is the same of pino.destination().
  const destination = new SonicBoom({
    dest: opts.destination || 1,
    sync: false,
  });
  await once(destination, "ready");

  return build(
    async function (source) {
      for await (let obj of source) {
        const toDrain = !destination.write(obj.msg.toUpperCase() + "\n");
        // This block will handle backpressure
        if (toDrain) {
          await once(destination, "drain");
        }
      }
    },
    {
      async close(err) {
        destination.end();
        await once(destination, "close");
      },
    }
  );
}
