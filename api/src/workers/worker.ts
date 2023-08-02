import { createApp } from "../appFactory";

export const createWorker = () => {
  const app = createApp();
  console.log(app);
};
