import json
import boto3



def lambda_handler(event, context):

    table = boto3.resource('dynamodb').Table('investors')
    table.load()
    response = table.scan()

    items = response['Items']
    print(items)
    #response is a list of startups with all of their info 
    return {
        'statusCode': 200,
        'body': json.dumps(items)
    }
        
        