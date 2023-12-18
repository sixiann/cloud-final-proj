import json
import boto3
from botocore.exceptions import ClientError

def get_res(ids, table):

    def lookup_data_2(key, tbl):
        db = boto3.resource('dynamodb')
        table = db.Table(tbl)
        try:
            response = table.get_item(Key=key)
        except ClientError as e:
            print('Error', e.response['Error']['Message'])

        print(response['Item'])
        return response['Item']

    print(ids, table)
    if table == 'startups':
        pkey = 'su'
    else:
        pkey = 'inv'
    
    results = []
    for i in ids:
        try:
            result = lookup_data_2(key={pkey:i}, tbl=table)
            results.append(result)
        except KeyError:
            pass
        
    return results


def lambda_handler(event, context):

    def lookup_data(key):
        db = boto3.resource('dynamodb')
        table = db.Table('users')
        try:
            response = table.get_item(Key=key)
        except ClientError as e:
            print('Error', e.response['Error']['Message'])
            return {
                'statusCode': 401,
                'body': 'UNAUTHORIZED'
            }
            
        print(response['Item'])
        return response['Item']

    # event = json.loads(event)
    print(event)
    username = event['username']
    feature = event['feature']
    if feature == "saved_startups":
        tl = 'startups'
    else:
        tl = 'investors'
    
    try:
        user_value = lookup_data({'username':username})[feature]
        print(user_value)
        res = get_res(user_value, tl)
        return {
            'statusCode': 200,
            'username': username,
            'body': json.dumps(res)
        }
    except KeyError:
        return {
            'statusCode': 500,
            'body': 'server error - failed to update'
        }
    except:
        return {
                'statusCode': 401,
                'body': 'UNAUTHORIZED'
            }
