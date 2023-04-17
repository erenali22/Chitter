from flask import Blueprint, request, jsonify
from app.models import User, Chatter, Hashtag
from sqlalchemy import or_

search_routes = Blueprint('search', __name__)

def search_users(query):
    users = User.query.filter(
        or_(
            User.username.ilike(f"%{query}%"),
            User.display_name.ilike(f"%{query}%")
        )
    ).all()
    return [user.to_dict() for user in users]

def search_chatters(query):
    chatters = Chatter.query.filter(
        Chatter.content.ilike(f"%{query}%")
    ).all()
    return [chatter.to_dict() for chatter in chatters]

def search_hashtags(query):
    hashtag = Hashtag.query.filter(Hashtag.tag.ilike(f"%{query}%")).first()
    if hashtag:
        chatters = hashtag.chatters
        return [chatter.to_dict() for chatter in chatters]
    else:
        return []

# Search route
@search_routes.route('/', methods=['GET'])
def search():
    search_type = request.args.get('type', 'users')  # Default search type is 'users'
    query = request.args.get('query', '').strip()

    if not query:
        return jsonify({"message": "Please input any keyword to start", "statusCode": 400}), 400

    if search_type == 'users':
        results = search_users(query)
    elif search_type == 'chatters':
        results = search_chatters(query)
    elif search_type == 'hashtags':
        results = search_hashtags(query)
    else:
        return jsonify({"message": "Invalid search type", "statusCode": 400}), 400

    return jsonify(results), 200

