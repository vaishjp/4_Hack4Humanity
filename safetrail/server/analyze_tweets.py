import os
import spacy
from pymongo import MongoClient
from dotenv import load_dotenv

# ✅ Load environment variables
load_dotenv(dotenv_path=".env")
MONGO_URI = os.getenv("MONGO_URI")

# ✅ Connect to MongoDB
client = MongoClient(MONGO_URI)
db = client["hack4humanity"]
tweets_collection = db["tweets"]
flagged_tweets_collection = db["flagged_tweets"]

# ✅ Load NLP Model
nlp = spacy.load("en_core_web_sm")

# ✅ Define Distress Keywords
DISTRESS_KEYWORDS = {"help me", "missing", "kidnapped", "lost", "abducted", "trafficking", "danger"}

# ✅ Function to Extract Named Entities (Persons & Locations)
def extract_named_entities(text):
    doc = nlp(text)
    entities = {"persons": [], "locations": []}

    for ent in doc.ents:
        if ent.label_ == "PERSON":  # Detects Names
            entities["persons"].append(ent.text)
        elif ent.label_ in ["GPE", "LOC"]:  # Detects Locations
            entities["locations"].append(ent.text)

    return entities

# ✅ Function to Check for Distress Signals
def is_distress_tweet(text):
    text_lower = text.lower()
    return any(keyword in text_lower for keyword in DISTRESS_KEYWORDS)

# ✅ Fetch and Analyze Tweets
def analyze_tweets():
    tweets = tweets_collection.find()  # Get all stored tweets
    for tweet in tweets:
        text = tweet["text"]
        if is_distress_tweet(text):
            entities = extract_named_entities(text)  # Extract names & locations
            flagged_tweet = {
                "tweet_id": tweet["tweet_id"],
                "text": tweet["text"],
                "timestamp": tweet["timestamp"],
                "author_id": tweet["author_id"],
                "persons": entities["persons"],  # Store detected names
                "locations": entities["locations"]  # Store detected locations
            }
            flagged_tweets_collection.insert_one(flagged_tweet)
            print(f"🚨 Flagged Tweet: {tweet['text']}")
            print(f"🆔 Persons Detected: {entities['persons']}")
            print(f"📍 Locations Detected: {entities['locations']}")

# ✅ Run Analysis
analyze_tweets()
print("✅ NER Analysis Completed.")