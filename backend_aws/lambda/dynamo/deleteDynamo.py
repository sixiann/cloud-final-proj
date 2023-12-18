import json
import boto3
from botocore.exceptions import ClientError

def lambda_handler(event, context):

    def lookup_data(key):
        db = boto3.resource('dynamodb')
        table = db.Table('users')
        try:
            response = table.get_item(Key=key)
        except ClientError as e:
            print('Error', e.response['Error']['Message'])

        print(response['Item'])
        return response['Item']
        
    def update_item(key, feature, value, table=None):
        if not table:
            dynamodb = boto3.resource('dynamodb')
            table = dynamodb.Table('users')
            
        # change student location
        response = table.update_item(
            Key={'username': key},
            UpdateExpression="set #feature=:f",
            ExpressionAttributeValues={
                ':f': json.loads(value)
            },
            ExpressionAttributeNames={
                "#feature": feature
            },
            ReturnValues="UPDATED_NEW"
        )
        print(response)
        return response


    # event = json.loads(event)
    username = event['username']
    feature = event['feature']
    
    user_value = set(lookup_data({'username':username})[feature])
    # print(user_value)
    
    try:
        new_value = event['values'].pop()
        # print(new_value)
    except KeyError:
        return {
            'statusCode': 406,
            'body': "Feature not in table"
        }
    
    if new_value not in user_value:
        return {
            'statusCode': 400,
            'body': "Value not in list - nothing to remove"
        }
    
    update_value = list(user_value - {new_value})
    # print(update_value)

    resp = update_item(username, feature, json.dumps(update_value))
    
    try:
        return {
            'statusCode': resp['ResponseMetadata']['HTTPStatusCode'],
            'body': resp
        }
    except KeyError:
        return {
            'statusCode': 500,
            'body': 'server error - failed to update'
        }
