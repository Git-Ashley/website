import { ECSClient, UpdateServiceCommand } from "@aws-sdk/client-ecs";

export const handler = async () => {
  //console.log('CLUSTER_ARN:', process.env.CLUSTER);
  //console.log('SERVICE_ARN:', process.env.SERVICE);
  const client = new ECSClient();
  try {
    const command = new UpdateServiceCommand({
      cluster: process.env.CLUSTER,
      service: process.env.SERVICE,
      desiredCount: 0,
    });
    
    const response = await client.send(command);
    console.log(`Updated to ${response.service?.desiredCount}`)
  } catch (error) {
    console.error("Error scaling service:", error);
  }
};