// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

// https://udeqp83s4j.execute-api.ca-central-1.amazonaws.com
export default $config({
  app(input) {
    return {
      name: "next-client",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },

  async run() {
    const vpc = new sst.aws.Vpc("MyVpc");

    const cluster = new sst.aws.Cluster("MyCluster", { vpc });

    const nodeSocialService = new sst.aws.Service("MyService", {
      cluster,
      image: "ashleyp1621/node-social:latest",
      serviceRegistry: {
        port: 80
      },
      scaling: {
        min: 0,
        max: 1,
      },
      /*public: {
        ports: [{ listen: "80/http" }],
      },*/
      health: {
        command: ["CMD-SHELL", "curl -f http://localhost:80/health || exit 1"],
        startPeriod: "20 seconds",
        timeout: "5 seconds",
        interval: "30 seconds",
        retries: 3
      },
    });

    const api = new sst.aws.ApiGatewayV2("MyApi", {
      vpc,
      link: [vpc, cluster],
      cors: {
        allowOrigins: ["https://www.ashphillips.ca", "https://ashphillips.ca"],
        allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowHeaders: ["Content-Type", "Usersession", "Set-Cookie", "Cookie", "Authorization", "X-Amz-Date", "Upgrade", "X-Api-Key", "X-Amz-Security-Token", "Accept", "referer", "sec-ch-ua", "sec-ch-ua-mobile", "sec-ch-ua-platform", "user-agent"],
        allowCredentials: true
      },
      /*domain: {
        name: "www.ashphillips.ca",
        dns: false,
        cert: "arn:aws:acm:ca-central-1:841162676985:certificate/5a718e2f-406e-42a1-b1bf-ce2c028d8f56"
      }*/
    });

    api.routePrivate('GET /node-social/{proxy+}', nodeSocialService.nodes.cloudmapService.arn);
    api.routePrivate('POST /node-social/{proxy+}', nodeSocialService.nodes.cloudmapService.arn);
    api.routePrivate('OPTIONS /node-social/{proxy+}', nodeSocialService.nodes.cloudmapService.arn);

    const serviceLambdaPermissions = [{
      actions: ["ecs:UpdateService"],
      resources: ['*'],
    }];
    const serviceLambdaEnv = {
      CLUSTER: cluster.id,
      SERVICE: nodeSocialService.nodes.service.id,
      TASK_DEFINITION: nodeSocialService.nodes.taskDefinition.arn,
    };

    api.route("POST /start-node-social", {
      handler: "./src/lambdas/startNodeSocialApi.handler",
      link: [nodeSocialService],
      environment: serviceLambdaEnv,
      permissions: serviceLambdaPermissions,
      memory: "128 MB",
    });

    api.route("POST /stop-node-social", {
      handler: "./src/lambdas/stopNodeSocialApi.handler",
      link: [nodeSocialService],
      environment: serviceLambdaEnv,
      permissions: serviceLambdaPermissions,
      memory: "128 MB",
    });*/

    // Deploy nextJs to s3
    const webApp = new sst.aws.Nextjs("NextApp", {
      link: [api],
      domain: {
        name: "www.ashphillips.ca",
        dns: false,
        cert: "arn:aws:acm:us-east-1:841162676985:certificate/5c48eb11-431f-4433-8787-c230a4c78cbd"
      },
      environment: {
        API_URL: api.url,
        NEXT_PUBLIC_API_URL: api.url,
      }
    });

    //console.log('api.url: ', api.url);
    return {
      apiEndpoint: api.url,
      //serviceUrl: nodeSocialService.url
    };
  },
});

// TODO Can I still use 'ANY' ?
// Uncomment the trust proxy code in index.js
// Docker image generated here with a node.js thingy.
  // Try first with new image PUSHED, then remove the need for dockerhub