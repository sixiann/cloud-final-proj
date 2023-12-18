import json
import boto3
from botocore.exceptions import ClientError

def lambda_handler(event, context):

    def lookup_data(key):
        db = boto3.resource('dynamodb')
        table = db.Table('users')
        try:
            response = table.get_item(Key=key)['Item']
        except ClientError as e:
            print('Error', e.response['Error']['Message'])
        except KeyError:
            print('Error: user not in DB')
        
        return response
        
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

    # print(event)
    # event = json.loads(event)
    username = event['username']
    feature = event['feature']
    # print(username, feature)
    
    user_value = lookup_data({'username':username})
    user_value = user_value[feature]
    print(user_value)
    
    new_values = event['values']
    print(new_values)
    
    update_value = list(set(user_value + new_values))
    update = json.dumps(update_value)
    print(update)

    resp = update_item(username, feature, update)
    
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
