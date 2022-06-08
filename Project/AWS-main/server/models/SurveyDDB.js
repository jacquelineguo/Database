const dynamooseclient = require('./dynamooseclient');
const RecipientDDBSchema = require('./RecipientDDB');

// create a new model class
const surveyDDBSchema = new dynamooseclient.Schema({
  "id": String,
  "title": String,
  "body": String,
  "subject": String,
  // refer to RecipientDDBSchema
  "recipients": {"type": Array, "schema": [RecipientDDBSchema]},
  "yes": { "type": Number, "default": 0 },
  "no": { "type": Number, "default": 0 },
  // refer to user id
  "_user": String,
  "dateSent": Date,
  "lastResponded": Date
});


// load the new schema to dynamoose
const surveyDDBModel = dynamooseclient.model('surveys', surveyDDBSchema);
module.exports = surveyDDBModel;