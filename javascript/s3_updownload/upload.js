import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { readFileSync } from 'fs'

const s3 = new S3Client()

const file = readFileSync('./file')

const response = await s3.send(new PutObjectCommand({
  Bucket: 'demo-bucket-asdf',
  Key: 'file',
  Body: file,
  ContentType: 'application/text'
}))