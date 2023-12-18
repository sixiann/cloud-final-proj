import json
import boto3
from opensearchpy import OpenSearch, RequestsHttpConnection
from requests_aws4auth import AWS4Auth


REGION = 'us-east-1'
HOST = 'search-startups-rws5gnfh7g4a67hllsmn4evwwa.us-east-1.es.amazonaws.com'
INDEX = 'investors'
BOT_ID = 'ZDAO20R7MN'
BOT_ALIAS_ID = 'VGT14JYCZO'

def lambda_handler(event, context):
    #send event in format: only include the fields u need to query
    # event = {
            # "investor_types": list,
            # "total_funding": int [0,1,2,3],
            # "region": string 
            # "top": ""
    # }
    
    
    inv_ids = query(event)
    
    # query dynamodb
    filtered_investors = []
    table = boto3.resource('dynamodb').Table('investors')
    table.load()

    for id in inv_ids:
        item = table.get_item(Key={'inv': id})["Item"]
        filtered_investors.append(item)
        
    # response is a list of startups with all of their info 
    if 'top' in event:
        filtered_investors = sorted(filtered_investors, key=lambda x: float(x['rank']))
    
    return {
        'statusCode': 200,
        'body': json.dumps(filtered_investors)
    }
        
# opensearch query
def query(query_params):
    
    q = {
    "size": 1000,
    "query": {
        "bool": {
            "must": [],
        }
    }
}

    for k, v in query_params.items():
        if k != "investor_types" and v != "" and k != "searchQuery" and k!="top":
            q['query']['bool']['must'].append({'match': {k: v}})
        
    
    if "investor_types" in query_params:
        for cat in query_params["investor_types"]:
            q['query']['bool']['must'].append({'match': {'investor_types': cat}})
            
    OS_client = OpenSearch(hosts=[{
        'host': HOST,
        'port': 443
    }],
        http_auth=get_awsauth(REGION, 'es'),
        use_ssl=True,
        verify_certs=True,
        connection_class=RequestsHttpConnection)

    # res = OS_client.search(index=INDEX, body=q)
    # hits = res['hits']['hits']

    results = set([])
    # for hit in hits:
    #     results.add(hit['_source']['inv'])
        
        
        
    #searchQuery
    if query_params['searchQuery'] != "":
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
            if 'investor_types' in slots:
                if 'value' in slots['investor_types']:
                    v = slots['investor_types']['value'].get('interpretedValue')
                    q['query']['bool']['must'].append({'match': {'investor_types': v}})

        except:
            print("no investor_types")
            
        print(q)
            
    res = OS_client.search(index=INDEX, body=q)
    hits = res['hits']['hits']

    
    for hit in hits:
        results.add(hit['_source']['inv'])
    
    results = list(results)
    return results

def get_awsauth(region, service):
    cred = boto3.Session().get_credentials()
    return AWS4Auth(cred.access_key,
                    cred.secret_key,
                    region,
                    service,
                    session_token=cred.token)