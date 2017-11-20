'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.add = (event, context, callback) => {
  const requestBody = JSON.parse(event.body);

  if (typeof requestBody.title !== 'string' || typeof requestBody.author !== 'string' || typeof requestBody.isbn !== 'number' || typeof requestBody.edition !== 'number' || typeof requestBody.copies !== 'number') {
    callback(new Error('Validation error occur while inserting new book.'));
    return;
  }
  const params = {
    TableName: 'slsbookapi',
    Item: {
      id: uuid.v1(),
      title: requestBody.title,
      author: requestBody.author,
      isbn: requestBody.isbn,
      edition: requestBody.edition,
      copies: requestBody.copies
    }
  }
  dynamoDb.put(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(new Error('Error occur while inserting new book.'));
      return;
    }
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item)
    }
    callback(null, response);
  })
}