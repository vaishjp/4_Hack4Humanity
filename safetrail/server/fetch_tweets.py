import os
import tweepy
import time
from dotenv import load_dotenv
from pymongo import MongoClient

# ✅ Load environment variables
load_dotenv(dotenv_path=".env")

# ✅ Get API Keys
BEARER_TOKEN = os.getenv("TWITTER_BEARER_TOKEN")
MONGO_URI = os.getenv("MONGO_URI")

# ✅ Authenticate with Twitter API
client_twitter = tweepy.Client(bearer_token=BEARER_TOKEN)

# ✅ Connect to MongoDB
client = MongoClient(MONGO_URI)
db = client["hack4humanity"]
collection = db["tweets"]

# ✅ Print MongoDB Database Name
print(f"✅ Connected to MongoDB Database: {db.name}")
print(f"✅ Using Collection: {collection.name}")

# ✅ Define Search Query
query = "missing person OR human trafficking OR help needed"

def fetch_tweets():
    try:
        print("🔍 Fetching tweets...")
        tweets = client_twitter.search_recent_tweets(query=query, max_results=10, tweet_fields=["created_at", "text", "author_id"])

        if tweets.data:
            for tweet in tweets.data:
                tweet_data = {
                    "tweet_id": str(tweet.id),  
                    "text": tweet.text,
                    "timestamp": tweet.created_at,  # ✅ Store as MongoDB Date (ISODate)
                    "author_id": str(tweet.author_id) if tweet.author_id else "Unknown"
                }

                # ✅ Store in MongoDB (Avoid Duplicates)
                if not collection.find_one({"tweet_id": tweet_data["tweet_id"]}):
                    collection.insert_one(tweet_data)
                    print(f"✅ Successfully stored in MongoDB: {tweet.text}")
                else:
                    print(f"⚠ Tweet already exists: {tweet.text}")

        print("⏳ Waiting 5 minutes before the next request...")
        time.sleep(300)

    except tweepy.TooManyRequests:
        print("❌ Rate limit exceeded. Waiting 15 minutes before retrying...")
        time.sleep(900)  
        fetch_tweets()  

    except Exception as e:
        print(f"❌ ERROR fetching tweets: {e}")

fetch_tweets()
