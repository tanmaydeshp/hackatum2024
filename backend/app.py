import feedparser
import numpy as np
import requests
from pymongo import MongoClient
from sentence_transformers import SentenceTransformer

from backend.src.utils.entry_process_util import process_entry

# from wordcloud import WordCloud


# rss_urls = [
#     r"https://rss.app/feeds/u6rcvfy6PTSf9vQ4.xml",
#     r"https://rss.feedspot.com/uk_car_rss_feeds/",
# ]
# , r"https://rss.app/feeds/MLuDKqkwFtd2tuMr.xml",
#   r"https://www.autobild.de/rss/22590661.xml",
#   r"https://rss.app/feed/AY3gpY8fWOkfCCWR"]

rss_urls = [
    r"https://rss.app/feeds/u6rcvfy6PTSf9vQ4.xml",
    r"https://www.autoexpress.co.uk/feed/all",
    r"https://www.autocar.co.uk/rss",
    r"https://www.fastcar.co.uk/feed",
    r"https://carbuyer.co.uk/rss/news",
    r"https://cardealermagazine.co.uk/publish/category/latest-news/feed",
    r"https://motorso.com/feed",
    r"https://automotiveblog.co.uk/feed",
    r"https://www.hiyacar.co.uk/blog/feed.xml",
    r"https://www.thedrive.co.uk/feed/",
    r"https://www.ecurie.co.uk/blog?format=rss",
    r"https://planetauto.co.uk/index.php?format=feed&type=rss",
    r"https://smart-motoring.com/feed/",
    r"https://thecarexpert.co.uk/feed",
    r"https://carwitter.com/feed",
    r"https://automotiveblog.co.uk/feed",
    r"https://carblog.co.uk/feed",
    r"https://splend.co.uk/blog/feed",
    r"https://whiterecovery.co.uk/feed",
    r"https://ottocar.co.uk/pco-blog/feed",
    r"https://thecarscene.co.uk/feed",
    r"https://www.cashitcaruk.com/blog",
    r"https://eurocarparts.com/blog/feed",
    r"https://arrowcarhire.co.uk/feed",
    r"https://mahimapolyclinictirur.com/",
    r"https://www.goodbyecar.uk/blog",
    r"https://co-cars.co.uk/feed",
    r"https://autobutler.co.uk/blog.atom",
    r"https://www.evanshalshaw.com/blog/",
    r"https://frontseatdriver.co.uk/",
    r"https://www.carmoney.co.uk/resources/blog",
    r"https://www.stablevehiclecontracts.co.uk/blog/",
    r"https://www.driving-news.co.uk/",
    r"https://carfinancegenie.co.uk/feed",
]


articles = {}

for rss_url in rss_urls:
    try:
        response = requests.get(rss_url, allow_redirects=True, timeout=10)
        # response.raise_for_status()  # Raise exception for HTTP errors
        feed = feedparser.parse(rss_url)
        if feed.get("status") == 301 or feed.get("status") is None:
            # Save the downloaded file locally
            with open("feed.xml", "wb") as file:
                file.write(response.content)
            with open("feed.xml", "r", encoding="utf-8") as file:
                feed = feedparser.parse(file.read())
            for entry in feed.entries:
                article_text = process_entry(entry, None, rss_url)
                articles[entry.title] = article_text
            # print("correct")
        elif feed.get("status") == 200:
            for entry in feed.entries:
                article_text = process_entry(entry, None, rss_url)
                articles[entry.title] = article_text
            # print("correct")
        else:
            print(f"Feed at {rss_url} returned status: {feed.get('status')}")
    except Exception as e:
        print(f"Error fetching feed from {rss_url}: {e}")
    # time.sleep(1)  # Add a 1-second delay between requests

keywords = ["electric", "vehicle", "car", "autonomous", "e-vehicle"]

for title in articles.keys():
    print(title + " : \n" + articles[title])

# Load the model
model = SentenceTransformer("all-MiniLM-L6-v2")

articles_vec = {}

for t in articles.keys():
    # Example long text (replace with your article)
    long_text = articles[t]

    # Split the text into smaller chunks (e.g., by sentences)
    import nltk
    from nltk.tokenize import sent_tokenize

    nltk.download("punkt")

    chunks = sent_tokenize(long_text)

    # Compute embeddings for each chunk
    chunk_embeddings = model.encode(chunks)

    # Aggregate embeddings (e.g., by averaging)
    article_embedding = np.mean(chunk_embeddings, axis=0)
    articles_vec[t] = article_embedding

# DATABASE


def load_source_articles_to_db(article, collection, articles_vec):
    # Iterate through articles and insert them into the database
    for title, content in article.items():
        try:
            # TODO embedding has to be a string
            #   or some other representation to add it to the document
            e = articles_vec[title].toString()
            document = {"title": title, "content": content, "emb": e}

            # Insert the document into the MongoDB collection
            collection.insert_one(document)
            print(f"Inserted article: {title}")
        except Exception as et:
            print(f"Error inserting article '{title}': {et}")


# Connection string (local or Atlas)
CONNECTION_STRING = "mongodb://localhost:27017/"  # For local MongoDB
# Create a MongoDB client
client = MongoClient(CONNECTION_STRING)

# Access a database (creates it if it doesn’t exist)
db = client["my_database"]

# Access a collection (creates it if it doesn’t exist)
collection_new = db["new_ai_generated_articles"]
collection_source = db["source_articles"]

# Insert a document
# collection_source.insert_one({"title": "Alice",
#   "content": 25,"embedding":""})
load_source_articles_to_db(articles, collection_source, articles_vec)
# TODO read data from source and analyze it
# TODO Put new generated articles in collection_new
# TODO use the collection_new for frontend to display

# Query example
result = collection_source.find_one({"title": "Alice"})
print(result)

# Close the connection
client.close()
