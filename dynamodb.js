import AWS from 'aws-sdk'

AWS.config.update({
  region: "ca-central-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = 'assignment2';