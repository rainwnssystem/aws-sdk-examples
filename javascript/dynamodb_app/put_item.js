import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb'
import { v4 as uuidv4 } from 'uuid'

const client = new DynamoDBClient()

const command = new PutItemCommand({
  TableName: 'users',
  Item: {
    uuid: { 'S': uuidv4() },
    username: { 'S': 'Alice' },
    email: { 'S': 'alice@example.com' }
  }
})

const response = await client.send(command)
console.log(response)