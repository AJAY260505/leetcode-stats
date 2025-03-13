import requests
import pandas as pd
from flask import Flask, jsonify

app = Flask(__name__)

# File path to Excel
file_path = "backend\leetcode.xlsx"

def fetch_leetcode_data(username):
    """Fetch user stats from LeetCode GraphQL API."""
    url = "https://leetcode.com/graphql"
    headers = {"Content-Type": "application/json"}
    query = {
        "query": '''
        query getUserProfile($username: String!) {
            matchedUser(username: $username) {
                username
                profile {
                    ranking
                }
                submitStatsGlobal {
                    acSubmissionNum {
                        difficulty
                        count
                    }
                }
            }
        }
        ''',
        "variables": {"username": username}
    }
    
    response = requests.post(url, json=query, headers=headers)
    if response.status_code != 200:
        return None

    data = response.json()
    try:
        submission_data = data["data"]["matchedUser"]["submitStatsGlobal"]["acSubmissionNum"]
        
        return {
            "username": username,
            "total_solved": submission_data[0]["count"],
            "easy": submission_data[1]["count"],
            "medium": submission_data[2]["count"],
            "hard": submission_data[3]["count"],
            "rank": data["data"]["matchedUser"]["profile"]["ranking"]
        }
    except (TypeError, KeyError, IndexError):
        return None

@app.route("/leetcode_stats", methods=["GET"])
def get_leetcode_stats():
    """API endpoint to fetch all students' LeetCode stats."""
    try:
        df = pd.read_excel(file_path)
        usernames = df["LeetCode Username"].dropna().unique().tolist()
        
        student_data = []
        for username in usernames:
            user_stats = fetch_leetcode_data(username)
            if user_stats:
                student_data.append(user_stats)

        return jsonify(student_data)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
