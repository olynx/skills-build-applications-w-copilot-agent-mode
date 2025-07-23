from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["octofit_db"]

# Drop collections if they exist for a clean start
db.users.drop()
db.teams.drop()
db.activity.drop()
db.leaderboard.drop()
db.workouts.drop()

# Create collections
users = db.create_collection("users")
teams = db.create_collection("teams")
activity = db.create_collection("activity")
leaderboard = db.create_collection("leaderboard")
workouts = db.create_collection("workouts")

# Create unique indexes
users.create_index("email", unique=True)
teams.create_index("name", unique=True)
activity.create_index("activity_id", unique=True)
leaderboard.create_index("leaderboard_id", unique=True)
workouts.create_index("workout_id", unique=True)

# List collections
print("Collections in octofit_db:", db.list_collection_names())
