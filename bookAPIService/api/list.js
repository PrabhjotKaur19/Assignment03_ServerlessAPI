'use strict';

const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const params = {
	TableName: 'slsbookapi'
}

module.exports.list = (event, context, callback) => {
	dynamoDb.scan(params, (error, result) => {
		if (error){
			console.error(error);
			callback(new Error('Could not display the list of books.'));
			return;
		}

		const response = {
			statusCode: 200,
			body: JSON.stringify(result.Items)
		};
		callback(null, response);

	})
}