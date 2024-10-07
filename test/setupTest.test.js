import { clearHana, setupHana } from "../utils/setupHana.js";
import { setupPino } from "../utils/setupPino.js";

before(async () => {
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

after(async () => {
  console.log("Cleaning hana...");
  setTimeout(async () => {
    await clearHana();
  }, 1);
});
