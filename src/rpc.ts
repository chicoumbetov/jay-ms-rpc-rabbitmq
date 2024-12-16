import { Channel, Connection } from "amqplib";

const amqplib = require("amqplib");
const { v4: uuid4 } = require("uuid");

let amqplibConnection: Connection | null = null;

const getChannel = async (): Promise<Channel | undefined> => {
  if (amqplibConnection === null) {
    amqplibConnection = await amqplib.connect(
      "amqps://oqujvuif:uiKVbfsGYaRKMHK2nrEqZzFbsPNG95Qe@seal.lmq.cloudamqp.com/oqujvuif"
    );
  } else {
    return await amqplibConnection?.createChannel();
  }
};

const expensiveDBOperation = (payload: any, fakeResponse: any) => {
  console.log(payload);
  console.log(fakeResponse);

  return new Promise((res, rej) => {
    setTimeout(() => {
      res(fakeResponse);
    }, 9000);
  });
};

const RPCObserver = async (RPC_QUEUE_NAME: string, fakeResponse: any) => {
  const channel: Channel | undefined = await getChannel();
  await channel?.assertQueue(RPC_QUEUE_NAME, {
    durable: false, // ! TODO: once delivered, will be removed
  });
  channel?.prefetch(1);
  channel?.consume(
    RPC_QUEUE_NAME,
    async (msg: any) => {
      if (msg.content) {
        // DB Operation
        const payload = JSON.parse(msg.content.toString());
        const response = await expensiveDBOperation(payload, fakeResponse); // call fake DB operation

        channel?.sendToQueue(
          msg.properties.replyTo,
          Buffer.from(JSON.stringify(response)),
          {
            correlationId: msg.properties.correlationId,
          }
        );
        channel.ack(msg);
      }
    },
    {
      noAck: false,
    }
  );
};

const requestData = async (
  RPC_QUEUE_NAME: string,
  requestPayload: any,
  uuid: string
) => {
  try {
    const channel = await getChannel();

    const q = await channel?.assertQueue("", { exclusive: true });

    channel?.sendToQueue(
      RPC_QUEUE_NAME,
      Buffer.from(JSON.stringify(requestPayload)),
      {
        replyTo: q?.queue,
        correlationId: uuid,
      }
    );

    return new Promise((resolve, reject) => {
      // timeout n
      const timeout = setTimeout(() => {
        channel?.close();
        resolve("API could not fullfil the request!");
      }, 8000);
      if (q?.queue) {
        channel?.consume(
          q.queue,
          (msg: any) => {
            if (msg.properties.correlationId == uuid) {
              resolve(JSON.parse(msg.content.toString()));
              clearTimeout(timeout);
            } else {
              reject("data Not found!");
            }
          },
          {
            noAck: true,
          }
        );
      }
    });
  } catch (error) {
    console.log(error);
    return "error";
  }
};

const RPCRequest = async (RPC_QUEUE_NAME: string, requestPayload: any) => {
  const uuid = uuid4(); // * correlationId
  return await requestData(RPC_QUEUE_NAME, requestPayload, uuid);
};

module.exports = {
  getChannel,
  RPCObserver,
  RPCRequest,
};
