from flask import Flask, request
import boto3
import uuid

app      = Flask(__name__)
dynamodb = boto3.client('dynamodb')

@app.route("/")
def hello():
  return "<p>app for dynamodb!!</p>"

@app.route("/users", methods=['GET'])
def find_user_by_id():

  query = request.args.get('id')

  response = dynamodb.get_item(
    TableName = 'users',
    Key = {
      "uuid": {"S": query}
    }
  )

  return response

@app.route("/users", methods=['POST'])
def create_user():
  body = request.get_json()

  response = dynamodb.put_item(
    TableName = 'users',
    Item = {
      "uuid": {"S": str(uuid.uuid4())},
      "username": {"S": body['name']},
      "email": {"S": body['email']}
    }
  )

  return response

@app.route('/users', methods=['PUT'])
def update_user():
  
  body = request.get_json()
  query = request.args.get('id')

  response = dynamodb.update_item(
    TableName = 'users',
    Key = {"uuid": {"S": query} },
    UpdateExpression = "SET username = :n, email = :e",
    ExpressionAttributeValues = {
      ":n": {"S": body['name']},
      ":e": {"S": body['email']}
    }
  )

  return response

@app.route('/users', methods=['DELETE'])
def delete_user():

  query = request.args.get('id')

  response = dynamodb.delete_item(
    TableName = 'users',
    Key = {"uuid": {"S": query}}
  )

  return response

if __name__ == "__main__":
  app.run(debug=True, host="0.0.0.0")