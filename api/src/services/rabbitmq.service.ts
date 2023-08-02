import { injectable } from "inversify";
import * as amqplib from "amqplib";
import { env } from "@/env/env";
import { type Json } from "@/types/json";
import { logger } from "@/utils/logger";

@injectable()
class RabbitMqService {
  private connection: amqplib.Connection | null = null;
  private channels: Map<string, amqplib.Channel> = new Map();

  constructor() {}

  private getConnectionString() {
    const user = env.rabbitmq.RABBITMQ_USER;
    const pass = env.rabbitmq.RABBITMQ_PASS;
    return `amqp://${user}:${pass}@localhost:5672`;
  }

  private existsChannel(queue: string) {
    return this.channels.has(queue);
  }

  async connect(queue: string) {
    if (this.existsChannel(queue)) return;
    logger.info(`connecting::rabbitmq::client::${queue}`);
    try {
      let connection: amqplib.Connection | null = null;
      if (!this.connection) {
        const connectionString = this.getConnectionString();
        connection = await amqplib.connect(connectionString);
        this.connection = connection;
      }
      const channel = await this.connection.createChannel();
      this.channels.set(queue, channel);

      await channel.assertQueue(queue, { durable: true });
      logger.info(`connected::rabbitmq::queue::${queue}`);
    } catch (error) {
      logger.error(`error::rabbitmq::connect::${error}`);
      throw error;
    }
  }

  async initialize(queues: string[]) {
    for (const queue of queues) {
      await this.connect(queue);
    }
  }

  /**
   * Method used by the consumer instances to consume messages
   * from the queue that they are listening to.
   */
  async consume(
    queue: string,
    onMessage: (message: amqplib.Message | null) => void
  ) {
    const channel = this.getChannel(queue);
    if (!channel) {
      throw new Error(`RabbitMQ::consume::channel::${queue}::not found`);
    }
    await channel.consume(queue, onMessage, { noAck: true });
  }

  /**
   * Method used by both the consumer and the publisher instances
   */
  publish(queue: string, message: Json) {
    const channel = this.getChannel(queue);
    if (!channel) {
      throw new Error(`RabbitMQ::publish::channel::${queue}::not found`);
    }
    const messageBuffer = Buffer.from(JSON.stringify(message));
    channel.sendToQueue(queue, messageBuffer);
  }

  closeQueue(queue: string) {
    logger.info(`closing::rabbitmq::queue::${queue}`);
    const channel = this.getChannel(queue);
    if (channel) {
      channel.close();
      this.channels.delete(queue);
    }
  }

  closeConnection() {
    logger.info(`closing::rabbitmq::connection`);
    // first close all channels
    this.channels.forEach((channel) => {
      channel.close();
    });
    this.channels.clear();
    if (this.connection) {
      this.connection.close();
      this.connection = null;
    }
  }

  private getChannel(queue: string) {
    return this.channels.get(queue);
  }
}

export default RabbitMqService;
