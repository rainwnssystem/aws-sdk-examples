import { DynamoDBClient, BatchWriteItemCommand } from '@aws-sdk/client-dynamodb'
import { v4 as uuidv4 } from 'uuid'

const client = new DynamoDBClient()

let users = []
let cnt = 0

for (let i = 0; i <= 10000; i++) {
  let input = {
    PutRequest: {
      Item: {
        uuid: { S: uuidv4() },
        username: { S: '' },
        email: { S: '' }
      }
    }
  }

  input.PutRequest.Item.username.S = `User${i}`
  input.PutRequest.Item.email.S    = `user${i}@example.com`
  users.push(input)
}

// solution 1:
//   if (i % 25 == 0) {
//     const input = {
//       RequestItems: {
//         users
//       }
//     }

//     const command = new BatchWriteItemCommand(input)
//     const response = await client.send(command)
//     console.log(`cnt: ${cnt += 25} \n`)

//     users = []
//   }
// }

// solution 2:
for (let i = 0; i < 10000; i += 25) {

  const input = {
    RequestItems: {
      users: users.slice(i, i + 25)
    }
  }

  const command = new BatchWriteItemCommand(input)
  const response = await client.send(command)
  // console.log(response)
  console.log(`cnt: ${cnt += 25}`)
}