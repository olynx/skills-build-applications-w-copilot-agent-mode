from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["octofit_db"]
print("Collections:", db.list_collection_names())
print("Users:", list(db.octofit_tracker_user.find({}, {"_id": 0, "username": 1, "email": 1})))
print("Teams:", list(db.octofit_tracker_team.find({}, {"_id": 0, "name": 1})))
print("Activities:", list(db.octofit_tracker_activity.find({}, {"_id": 0, "activity_type": 1})))
print("Leaderboard:", list(db.octofit_tracker_leaderboard.find({}, {"_id": 0, "score": 1})))
print("Workouts:", list(db.octofit_tracker_workout.find({}, {"_id": 0, "name": 1})))
