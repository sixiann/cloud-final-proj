import json
import boto3
import re
 
# Make a regular expression
# for validating an Email
regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'

client = boto3.client('ses', region_name='us-east-1')

def check(email):
 
    # pass the regular expression
    # and the string into the fullmatch() method
    if(re.fullmatch(regex, email)):
        return True
    else:
        print(email, "Invalid Email")
        return False
    
    
def lambda_handler(event, context):
    
    table = boto3.resource('dynamodb').Table('news')
    table.load()
    response = table.scan()
    items = response['Items']
    
    pre_template = """
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Your Daily StartupsNYC News</title>
                <style>
                    body {
                        font-family: 'Arial', sans-serif;
                        background-color: #f4f4f4;
                        color: #333;
                        padding: 20px;
                        margin: 0;
                    }
                    
                    #container {
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #fff;
                        padding: 20px;
                        border-radius: 5px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    
                    h1 {
                        color: #007BFF;
                    }
                    
                    p {
                        line-height: 1.6;
                    }
                    
                    footer {
                        margin-top: 20px;
                        text-align: center;
                        color: #666;
                    }
                </style>
            </head>
            <body>
                <div id="container">
                    <h1>Your Daily StartupsNYC News</h1>
        """
    
    def generate_template(name):
        template = f"""
                    <p>Hello {name},</p>
                    <p>We hope you enjoy the latest updates and news from the StartupsNYC community.</p>
                    <p>Here are some highlights for today:</p>
                    <ul>
        """
        return template
                    
    template2 = """
                </ul>
                <p>Stay tuned for more exciting news!</p>
                <footer>
                    <p>Best regards,<br>StartupsNYC Team</p>
                </footer>
            </div>
        </body>
        </html>
    
    """
    
    msg = ''
    for article in items:
        msg += f'<li><b><a href="{article['article_link']}">{article['title']}</a></b><p>{article['summary']}</p></li>'
        
    table = boto3.resource('dynamodb').Table('users')
    table.load()
    response = table.scan()
    
    filtered_emails = []
    for person in response['Items']:
        
        if 'newsletter' not in person:
            continue
        if not person['newsletter']:
            continue
        if not check(person['email']):
            continue
        
        filtered_emails.append((person['email'], person['name']))
            
    print(filtered_emails)
    
    for user_email, name in filtered_emails:
        response = client.send_email(
            Destination={
                'ToAddresses': [user_email]
            },
            Message={
                'Body': {
                    'Html': {
                        'Charset': 'UTF-8',
                        'Data': pre_template+ generate_template(name) + msg + template2,
                    },
                    'Text': {
                        'Charset': 'UTF-8',
                        'Data': msg,
                    },
                },
                'Subject': {
                    'Charset': 'UTF-8',
                    'Data': 'Your Daily StartupsNYC News',
                },
            },
            Source='friedmansamm@gmail.com'
        )
    
    print(response)
    
    return {
        'statusCode': 200,
        'body': json.dumps("Email Sent Successfully. MessageId is: " + response['MessageId'])
    }