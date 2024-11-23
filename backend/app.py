import feedparser

from backend.src.utils.entry_process_util import process_entry

# from wordcloud import WordCloud


rss_urls = [
    r"https://rss.app/feeds/u6rcvfy6PTSf9vQ4.xml",
    r"https://rss.feedspot.com/uk_car_rss_feeds/",
]
# , r"https://rss.app/feeds/MLuDKqkwFtd2tuMr.xml",
#   r"https://www.autobild.de/rss/22590661.xml",
#   r"https://rss.app/feed/AY3gpY8fWOkfCCWR"]

articles = {}

for rss_url in rss_urls:
    feed = feedparser.parse(rss_url)
    if feed.status == 200:
        for entry in feed.entries:
            article_text = process_entry(entry, None)
            articles[entry.title] = article_text
    else:
        continue

keywords = ["electric", "vehicle", "car", "autonomous", "e-vehicle"]

for title in articles.keys():
    print(title + " : \n" + articles[title])

# if keywords in article_text:
# score += 1 * weightage;
