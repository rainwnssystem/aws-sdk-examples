import { DynamoDBClient, DeleteItemCommand } from '@aws-sdk/client-dynamodb'

const client = new DynamoDBClient()

const command = new DeleteItemCommand({
  TableName: 'users',
  Key: {
    uuid: { 'S': '103e1cc5-e5ca-4c6c-92e0-29c669e6ab80' }
  }
})

const response = await client.send(command)
console.log(response)