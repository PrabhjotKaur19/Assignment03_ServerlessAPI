'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.delete = (event, context, callback) => {
	const params = {
		TableName: 'slsbookapi',
		Key:{
			id:event.pathParameters.id
		}
	};

	dynamoDb.delete(params, (error) => {
		if (error){
			console.error(error);
			callback(new Error('Error occur while deleting the book.'));
			return;
		}

		const response = {
			statusCode: 200,
			body: JSON.stringify({})
		};
		callback(null, response);

	});
};