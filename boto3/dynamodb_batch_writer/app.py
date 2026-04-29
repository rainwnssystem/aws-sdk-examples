import boto3
import uuid

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('users')

with table.batch_writer() as batch:
    for i in range(10000):
        batch.put_item(
            Item={
                'uuid': str(uuid.uuid4()),
                'username': 'user' + str(i),
                'email': f'user{str(i)}@example.com'
            }
        )