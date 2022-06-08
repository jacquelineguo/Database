const dynamoose = require('dynamoose');

dynamoose.aws.sdk.config.update({
    "accessKeyId": "please contact Fang Fang to get accessKeyId",
    "secretAccessKey": "please contact Fang Fang to get secretAccessKey",
    "region": "us-east-1"
});

module.exports = dynamoose;
