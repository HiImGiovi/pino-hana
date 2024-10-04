import { setupPino } from "../utils/setupPino.js";

before(() => {
  console.log("Setting up pino logger...");
  setupPino();
});
