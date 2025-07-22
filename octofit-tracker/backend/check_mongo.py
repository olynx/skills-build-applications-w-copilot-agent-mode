from pymongo import MongoClient
try:
    client = MongoClient("mongodb://localhost:27017/", serverSelectionTimeoutMS=3000)
    client.server_info()
    print("MongoDB is running and accessible.")
except Exception as e:
    print("MongoDB is not accessible:", e)
