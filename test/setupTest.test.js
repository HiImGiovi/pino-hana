import { setupHana, clearHana } from "../utils/setupHana.js";
import { setupPino } from "../utils/setupPino.js";

before(async () => {
  console.log("Setting up pino logger...");
  setupPino();
  await setupHana();
});

after(async () => {
  console.log("Cleaning hana...");
  await clearHana();
});
