import { TYPES } from "@/lib/types";
import { inject, injectable } from "inversify";
import RabbitMqService from "./rabbitmq.service";

@injectable()
class WorkerProcessorService {
  constructor(
    @inject(TYPES.RabbitMqService) private rabbitmqService: RabbitMqService
  ) {}

  async process() {
    //implement
  }
}

export default WorkerProcessorService;
