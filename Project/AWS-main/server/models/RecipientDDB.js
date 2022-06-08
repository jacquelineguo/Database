const dynamooseclient = require('./dynamooseclient');

// create a new model class to store the recipients and if responded 
const recipientDDBSchema = new dynamooseclient.Schema({
  "email": String,
  "responded": { "type": Boolean, "default": false }
});

module.exports = recipientDDBSchema;