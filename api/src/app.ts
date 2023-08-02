import { createApp } from "./appFactory";
import dotenv from "dotenv";
dotenv.config();

(async () => {
  const app = await createApp();

  app.listen(process.env.PORT, () => {
    console.log("Server listening on port " + process.env.PORT + "...");
  });
})();
