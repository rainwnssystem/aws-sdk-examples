import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'

const client = new S3Client()

const command = new GetObjectCommand({
  Bucket: 'demo-bucket-asdf',
  Key: 'ash.jpg'
})

const url = await getSignedUrl(client, command, { expiresIn: 30 })
console.log(url)