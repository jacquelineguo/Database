const dynamooseclient = require('./dynamooseclient');

// create a new model class
const userDDBSchema = new dynamooseclient.Schema({
  "id": String,
  "googleId": String,
  "credits": { "type": Number, "default": 0 }
});

// load the new schema to dynamoose
const userDDBModel = dynamooseclient.model('users', userDDBSchema);
module.exports = userDDBModel;