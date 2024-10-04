import build from "pino-abstract-transport";

export default async function (opts) {
  console.log(opts);
  return build(async function (source) {
    for await (let obj of source) {
      console.log(obj);
    }
  });
}
