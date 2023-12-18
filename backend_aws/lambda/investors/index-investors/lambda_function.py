import json
import boto3
from opensearchpy import OpenSearch, RequestsHttpConnection
from requests_aws4auth import AWS4Auth


REGION = 'us-east-1'
HOST = 'search-startups-rws5gnfh7g4a67hllsmn4evwwa.us-east-1.es.amazonaws.com'
INDEX = 'investors'

def lambda_handler(event, context):
    
    
    
    with open('investors.json', 'r') as file:
        data = json.load(file)
    

    open_search = OpenSearch(hosts=[{
            'host': HOST,
            'port': 443
        }],
                            http_auth=get_awsauth(REGION, 'es'),
                            use_ssl=True,
                            verify_certs=True,
                            connection_class=RequestsHttpConnection)
    
    
    
    i = 1
    for k,v in data.items():
        
        #process total_funding
        funding_category = int(v["total_funding"] // 5000000)
        total_funding = min(3, funding_category)
        
        
        #document body
        doc = {
            "inv": v["inv"],      
            "investor_types": v['investor_types'],
            "total_funding": total_funding,
            "region": v['region']
        }
        print(doc)
        
        open_search.index(index=INDEX, body=doc, id = i)
        i += 1
        
    
    return {
        'statusCode': 200
        # 'body': json.dumps('labels')
    }
        
        
        
def get_awsauth(region, service):
    cred = boto3.Session().get_credentials()
    return AWS4Auth(cred.access_key,
                    cred.secret_key,
                    region,
                    service,
                    session_token=cred.token)