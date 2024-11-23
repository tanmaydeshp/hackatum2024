from wordcloud import  WordCloud
import feedparser
from bs4 import BeautifulSoup
import requests
rss_urls  = [r"https://rss.app/feeds/u6rcvfy6PTSf9vQ4.xml", r"https://rss.feedspot.com/uk_car_rss_feeds/"]
    # , r"https://rss.app/feeds/MLuDKqkwFtd2tuMr.xml", r"https://www.autobild.de/rss/22590661.xml", r"https://rss.app/feed/AY3gpY8fWOkfCCWR"]
articles = {}
for rss_url in rss_urls:
    feed = feedparser.parse(rss_url)
    if feed.status == 200:

        for entry in feed.entries:
            soup = BeautifulSoup(requests.get(entry.link).content, 'html.parser')
            author = None
            author_tag = soup.find('meta', attrs={'name': 'author'}) or soup.find('span', class_='author')
            if author_tag:
                author = author_tag.get_text(strip=True) if author_tag.name != 'meta' else author_tag['content']
            pub_date = None
            date_tag = soup.find('meta', attrs={'property': 'article:published_time'}) or soup.find('time')
            if date_tag:
                pub_date = date_tag.get_text(strip=True) if date_tag.name != 'meta' else date_tag['content']
            content = []
            for paragraph in soup.find_all('p'):
                content.append(paragraph.get_text(strip=True))
            article_text = '\n'.join(content)
            articles[entry.title] = article_text
    else:
        continue

keywords = ["electric", "vehicle", "car", "autonomous", "e-vehicle"]

for title in articles.keys():
    print(title + " : \n" + articles[title])

#if keywords in article_text:
    #score += 1 * weightage;






