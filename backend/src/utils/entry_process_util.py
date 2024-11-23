import re

import requests
from bs4 import BeautifulSoup


def clean_content_simple(soup_raw):
    # Extract all text from <p> tags
    paragraphs = soup_raw.find_all("p")
    content_raw = []

    for p in paragraphs:
        text = p.get_text(strip=True)

        # Skip paragraphs that are only one word long
        if len(text.split()) > 3:
            content_raw.append(text)

    # Join the remaining content into a single string
    text_raw = "\n".join(content_raw)

    # Remove unwanted words/phrases
    unwanted_words = ["Copy link", "twitter", "facebook", "whatsapp", "email"]
    for word in unwanted_words:
        text_raw = text_raw.replace(word, "")

    # Remove lines containing questions, comments, or update information
    # Regex to remove questions or comments
    # (e.g., "Got a subscription voucher?", "Questions?")
    text_raw = re.sub(
        r"^.*\b(questions?|comment|"
        r"subscribe|email|sign\s*up|sign\s*in|terms?|feedback|contact)\b.*$",
        "",
        text_raw,
        flags=re.IGNORECASE,
    )

    # Remove lines containing update timestamps or dates
    # (e.g., "Updated:", "Published on")
    text_raw = re.sub(
        r"^(.*\b(updated|published|last\s*modified|created|timestamp)\b.*)$",
        "",
        text_raw,
        flags=re.IGNORECASE,
    )

    # Remove empty lines or excessive whitespace that may have been left
    text_raw = re.sub(r"\n\s*\n", "\n", text_raw)

    # Strip extra spaces and return
    return text_raw.strip()


def process_entry(entry, session):
    soup = BeautifulSoup(requests.get(entry.link).content, "html.parser")
    # author = None
    # author_tag = soup.find("meta", attrs={"name": "author"}) or soup.find(
    #     "span", class_="author"
    # )
    # if author_tag:
    #     author = (
    #         author_tag.get_text(strip=True)
    #         if author_tag.name != "meta"
    #         else author_tag["content"]
    #     )
    # pub_date = None
    # date_tag = soup.find(
    #     "meta", attrs={"property": "article:published_time"}
    # ) or soup.find("time")
    # if date_tag:
    #     pub_date = (
    #         date_tag.get_text(strip=True)
    #         if date_tag.name != "meta"
    #         else date_tag["content"]
    #     )
    # content = []
    # for paragraph in soup.find_all("p"):
    #     content.append(paragraph.get_text(strip=True))
    # article_text = "\n".join(content)
    article_text = clean_content_simple(soup)
    return article_text
