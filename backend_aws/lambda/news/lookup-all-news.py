import json
import boto3



def lambda_handler(event, context):

    table = boto3.resource('dynamodb').Table('news')
    table.load()
    response = table.scan()

    items = response['Items']
    
    #response is a list of news with all of their info 
    return {
        'statusCode': 200,
        'body': json.dumps(items)
    }
        
        