from flask import Blueprint, jsonify, request
from app.models import db, Chatter, Reply, User
from app.helpers import token_required

reply_routes = Blueprint('replies', __name__)

# Create a Reply
@reply_routes.route('/chatters/<int:chatter_id>/replies', methods=['POST'])
@token_required
def create_reply(user, chatter_id):
    chatter = Chatter.query.get(chatter_id)
    if not chatter:
        return jsonify(message="Chatter not found", statusCode=404), 404

    content = request.json.get('content')
    if not content:
        return jsonify(message="Content is required", statusCode=400), 400

    reply = Reply(content=content, user_id=user.id, chatter_id=chatter_id)
    db.session.add(reply)
    db.session.commit()

    return jsonify(message="Reply created", **reply.to_dict()), 201

# Get Replies for a Chatter
@reply_routes.route('/chatters/<int:chatter_id>/replies', methods=['GET'])
def get_replies(chatter_id):
    chatter = Chatter.query.get(chatter_id)
    if not chatter:
        return jsonify(message="Chatter not found", statusCode=404), 404

    replies = [reply.to_dict() for reply in chatter.replies]
    return jsonify(replies), 200

# Update a Reply
@reply_routes.route('/replies/<int:reply_id>', methods=['PUT'])
@token_required
def update_reply(user, reply_id):
    reply = Reply.query.get(reply_id)
    if not reply or reply.user_id != user.id:
        return jsonify(message="Reply not found or not owned by the user", statusCode=404), 404

    content = request.json.get('content')
    if not content:
        return jsonify(message="Content is required", statusCode=400), 400
    reply.content = content
    db.session.commit()

    return jsonify(message="Reply updated", **reply.to_dict()), 200

# Delete a Reply
@reply_routes.route('/replies/<int:reply_id>', methods=['DELETE'])
@token_required
def delete_reply(user, reply_id):
    reply = Reply.query.get(reply_id)
    if not reply or reply.user_id != user.id:
        return jsonify(message="Reply not found or not owned by the user", statusCode=404), 404

    db.session.delete(reply)
    db.session.commit()

    return jsonify(message="Reply deleted", statusCode=200), 200
