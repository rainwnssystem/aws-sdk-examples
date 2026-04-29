import { DynamoDBClient, UpdateItemCommand } from '@aws-sdk/client-dynamodb'

const client = new DynamoDBClient()

const command = new UpdateItemCommand({
  TableName: 'users',
  ExpressionAttributeNames: {
    '#username': 'username',
    '#email': 'email'
  },
  UpdateExpression: 'SET #username = :u, #email = :e',
  ExpressionAttributeValues: {
    ':u': {
      'S': 'Alice2'
    },
    ':e': {
      'S': 'alice2@example.com'
    }
  },
  Key: {
    uuid: { 'S': '103e1cc5-e5ca-4c6c-92e0-29c669e6ab80' }
  }
})

const response = await client.send(command)
console.log(response)