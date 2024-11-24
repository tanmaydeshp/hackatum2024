import feedparser
import requests

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

from sentence_transformers import SentenceTransformer
import numpy as np

# Load the model
model = SentenceTransformer('all-MiniLM-L6-v2')

articles_vec = {}

for t in articles.keys():

    # Example long text (replace with your article)
    long_text = articles[t]

    # Split the text into smaller chunks (e.g., by sentences)
    from nltk.tokenize import sent_tokenize
    import nltk
    nltk.download('punkt')

    chunks = sent_tokenize(long_text)

    # Compute embeddings for each chunk
    chunk_embeddings = model.encode(chunks)

    # Aggregate embeddings (e.g., by averaging)
    article_embedding = np.mean(chunk_embeddings, axis=0)
    articles_vec[t]= article_embedding

from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

def similarity_score(e1, e2):
    # Compute cosine similarity
    similarity = cosine_similarity([e1], [e2])
    return similarity[0][0]

def top_similar(topic):
    topic_embed = model.encode(topic)
    outputs = []
    title_ratings = {}
    for title in articles.keys():
        score = similarity_score(topic_embed, title)
        title_ratings[title] = score
        if score>0/6:
            outputs.append(title)
    if len(outputs) == 0:
        max_title = max(outputs, key=outputs.get)
        outputs.append(max_title)
    
    return outputs

import openai 
import os

def generate_topic(input_titles):
    # Define your API endpoint and API key
    openai.api_base = os.getenv("OPENAI_API_ENDPOINT")  # Replace with your Azure OpenAI endpoint
    openai.api_key = os.getenv("OPENAI_API_KEY")  # Replace with your Azure API key

    # The deployment ID for the Azure OpenAI model
    deployment_id = "gpt-4o"  # Replace with the name of your deployed model (e.g., "text-davinci-003")

    # Convert the list to a prompt
    prompt = f"""Your input is a list of the following titles of news articles relating to electric vehicles: {' , '.join(input_titles)}. 
    Based on these titles of articles, you must come up with your own topic for a news article. 
    Your created topic must be interesting, attention-grabbing, factually correct and relevant to the titles provided to you. 
    Exclude potentially discriminatory or inappropriate content from your ideas. 
    It is not necessary for your idea to be incredibly different from the inputs, 
    but a novel idea that still incorporates aspects of the original inputs is a plus. 
    It is important that you do not plagiarise and that the idea contains your own transformative work."""

    # Call the OpenAI API to generate a topic
    response = openai.Completion.create(
        engine=deployment_id,  # Use your deployment ID
        prompt=prompt,
        max_tokens=50,  # Adjust token limit as needed
        temperature=0.2,  # Adjust temperature for creativity
    )

    # Extract and print the generated topic
    generated_topic = response.choices[0].text.strip()
    return generated_topic 

def generate_article(topic):
    input_topics = top_similar(topic)
    # Define your API endpoint and API key
    openai.api_base = os.getenv("OPENAI_API_ENDPOINT")  # Replace with your Azure OpenAI endpoint
    openai.api_key = os.getenv("OPENAI_API_KEY")  # Replace with your Azure API key

    # The deployment ID for the Azure OpenAI model
    deployment_id = "gpt-4o"  # Replace with the name of your deployed model (e.g., "text-davinci-003")

    # Convert the list to a prompt
    prompt = f"""Your input is the following topic : {topic}, as well as a collection of source articles joined into a single string:
                {' \n '.join(input_topics)}. 
                You must use these articles as sources to generate a high-quality news article about your assigned topic.
                High quality is defined as follows: Articles should be relevant to the assigned topic. 
                Articles should be original and complete, or if they rely on other sources, 
                they should not plagiarize or copy them and have a substantial transformative quality to them and be well-sourced. 
                They should be user-oriented and not search-engine oriented. Amongst other things, 
                this means they should not be artificially bloated to achieve a certain word count without having much information of substance. 
                They should be written in user-friendly language and have an appealing presentation. Background information about the author, 
                or an author that is an expert in the subject matter are a plus. 
                Additionally, they should not contain easily-verifiable factual errors."""

    # Call the OpenAI API to generate a similar article
    response = openai.Completion.create(
        engine=deployment_id,  # Use your deployment ID
        prompt=prompt,
        max_tokens=500,  # Adjust token limit as needed
        temperature=0.2,  # Adjust creativity level
        top_p=1.0,
        frequency_penalty=0.5,
        presence_penalty=0.5,
    )

    # Extract and print the generated article
    generated_article = response.choices[0].text.strip()
    return generated_article

x = generate_topic(articles.keys())
y= generate_article(x)

print('Generated article: \n' + y)



    
