import boto3

s3 = boto3.client('s3')

s3.download_file("demo-bucket-asdf", "file", "file2")