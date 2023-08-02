import type RabbitMqService from "@/services/rabbitmq.service";
import { createApp } from "../appFactory";
import { container } from "@/lib/ioc";
import { TYPES } from "@/lib/types";
import { logger } from "@/utils/logger";

(async () => {
  await createApp(false);
  const rabbitmqService = container.get<RabbitMqService>(TYPES.RabbitMqService);

  try {
    await rabbitmqService.consume("test", (message) => {
      if (message != null) {
        console.log(message.content.toString());
      }
    });
  } catch (error) {
    logger.error("RabbitMQ::consumer::error", error);
  }
})();
