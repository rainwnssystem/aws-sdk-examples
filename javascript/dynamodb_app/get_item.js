import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb'

const client = new DynamoDBClient()

const command = new GetItemCommand({
  TableName: 'users',
  Key: {
    uuid: { 'S': 'c598c121-ac9f-4224-9420-61930744c9c7' }
  }
})

const response = await client.send(command)
console.log(response)