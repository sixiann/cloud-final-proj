import json
import boto3
import urllib.request
import urllib.parse
from bs4 import BeautifulSoup


#cloudwatch this function everyday to insert new news everyday 

def lambda_handler(event, context):
    
    url = 'https://techcrunch.com/category/startups/'
    with urllib.request.urlopen(url) as response:
        html = response.read()
        
    articles = []
    soup = BeautifulSoup(html, 'html.parser')
    
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('news')
    
    i = 1
    for article in soup.find_all('div', class_='post-block post-block--image post-block--unread'):
        
        title = article.find('a', class_='post-block__title__link').get_text(strip=True)
        author = article.find('span', class_='river-byline__authors').get_text(strip=True)
        published_date = article.find('time', class_='river-byline__time').get('datetime')
        summary = article.find('div', class_='post-block__content').get_text(strip=True)
        link = article.find('a', class_='post-block__title__link').get('href')
        
        image_tag = article.find('img')
        image_url = image_tag.get('src') if image_tag else None
        
        with urllib.request.urlopen(link) as response:
            article_html = response.read()
        article_soup = BeautifulSoup(article_html, 'html.parser')
        article_text = article_soup.find('div', class_='article-content').get_text(strip=True)
        
        
        article = {
                'id': str(i),
                'title': title,
                'author': author,
                'published_date': published_date,
                'summary': summary,
                'article_text': article_text,
                'image_url': image_url,
                'article_link': link
            }
        
        table.put_item(Item=article)
        i+= 1

    
    return {
        'statusCode': 200,
        'body': json.dumps(articles)
    }
