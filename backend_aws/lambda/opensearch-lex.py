import json
import boto3
from opensearchpy import OpenSearch, RequestsHttpConnection
from requests_aws4auth import AWS4Auth


REGION = 'us-east-1'
HOST = 'search-startups-rws5gnfh7g4a67hllsmn4evwwa.us-east-1.es.amazonaws.com'
INDEX = 'startups'

BOT_ID = 'ZDAO20R7MN'
BOT_ALIAS_ID = 'VGT14JYCZO'

def lambda_handler(event, context):
    #send event in format: only include the fields u need to query
    # event = {
    #     "category_list": #list
    #     "employee_count": #string
    #     "region": "string"
    #     "total_funding": 0 1 2 3 
    #.    "top": ""
    # }
    
    
    su_ids = query(event)
    
    # query dynamodb
    filtered_startups = []
    table = boto3.resource('dynamodb').Table('startups')
    table.load()

    for id in su_ids:
        item = table.get_item(Key={'su': id})["Item"]
        filtered_startups.append(item)
        
    #response is a list of startups with all of their info 
    
    if 'top' in event:
        filtered_startups = sorted(filtered_startups, key=lambda x: float(x['rank']))
        
    return {
        'statusCode': 200,
        'body': json.dumps(filtered_startups)
    }
        
# opensearch query
def query(query_params):
    
    OS_client = OpenSearch(hosts=[{
        'host': HOST,
        'port': 443
    }],
        http_auth=get_awsauth(REGION, 'es'),
        use_ssl=True,
        verify_certs=True,
        connection_class=RequestsHttpConnection)
        
        
    
    
    q = {
    "size": 1000,
    "query": {
        "bool": {
            "must": [],
            }
        }
    }

    for k, v in query_params.items():
        if v != "" and k != "category_list" and k != "searchQuery" and k!= "top":
            q['query']['bool']['must'].append({'match': {k: v}})
        
    
    for cat in query_params["category_list"]:
        q['query']['bool']['must'].append({'match': {'category_list': cat}})
            

    # res = OS_client.search(index=INDEX, body=q)
    # hits = res['hits']['hits']

    results = set([])
    # for hit in hits:
    #     results.add(hit['_source']['su'])


    #searchQuery
    if query_params['searchQuery'] != "":
        print(query_params['searchQuery'])
        searchQuery = query_params['searchQuery']
        
        LEX_client = boto3.client('lexv2-runtime')

        # Initiate conversation with Lex
        response = LEX_client.recognize_text(
            botId=BOT_ID,
            botAliasId=BOT_ALIAS_ID,
            localeId='en_US',
            sessionId='testuser',
            text=searchQuery)
    
        slots = response.get('sessionState', {}).get('intent', {}).get('slots', {})
        query_string = ""
        
        try:
            if 'region' in slots:
                if 'value' in slots['region']:
                    v = slots['region']['value'].get('interpretedValue')
                    q['query']['bool']['must'].append({'match': {'region': v}})

        
        except:
            print("no region")
        
        try:
            if 'employee_count' in slots:
                if 'value' in slots['employee_count']:
                    v = slots['employee_count']['value'].get('interpretedValue')
                    q['query']['bool']['must'].append({'match': {'employee_count': v}})
        except:
            print("no employee count")
        
        try:
            if 'category_list' in slots:
                if 'value' in slots['category_list']:
                    v = slots['category_list']['value'].get('interpretedValue')
                    q['query']['bool']['must'].append({'match': {'category_list': v}})

        except:
            print("no category list")
        


        
    res = OS_client.search(index=INDEX, body=q)
    hits = res['hits']['hits']

    
    for hit in hits:
        results.add(hit['_source']['su'])
    
    print(q)

    results = list(results)
    return results
        
def get_awsauth(region, service):
    cred = boto3.Session().get_credentials()
    return AWS4Auth(cred.access_key,
                    cred.secret_key,
                    region,
                    service,
                    session_token=cred.token)