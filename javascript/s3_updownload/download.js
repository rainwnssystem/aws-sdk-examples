import { writeFile } from 'node:fs/promises'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'

const client = new S3Client()

const command = new GetObjectCommand({
  Bucket: 'demo-bucket-asdf',
  Key: 'file'
})

const { Body } = await client.send(command)

await writeFile('./file2', Body)