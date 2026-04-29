import boto3
from botocore.exceptions import ClientError
from botocore.config import Config
import requests
import logging

def create_presigned_url(
  bucket_name, object_name, region_name, expiration=30
):
  
  s3 = boto3.client(
    's3',
    region_name = region_name,
    config = Config(
    signature_version = 's3v4',
    s3 = {'addressing_style': 'virtual'}
  ))
  
  try:
    response = s3.generate_presigned_url(
      'get_object',
      Params = {'Bucket': bucket_name, 'Key': object_name},
      ExpiresIn = expiration
    )
  except ClientError as e:
    logging.error(e)
    return None

  return response

url = create_presigned_url('demo-bucket-asdf', 'file', 'us-east-1')
if url is not None:
  response = requests.get(url)
  print(url)