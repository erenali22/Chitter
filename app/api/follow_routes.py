from flask import Blueprint, jsonify, request
from app.models import db, User
from flask_login import current_user, login_required

follow_routes = Blueprint('follow', __name__)

# Follow a User
@follow_routes.route('/<int:user_id>', methods=['POST'])
@login_required
def follow_user(user_id):
    if user_id == current_user.id:
        return jsonify(message="You cannot follow yourself", statusCode=400), 400

    user = User.query.get(user_id)
    if not user:
        return jsonify(message="User not found", statusCode=404), 404

    if current_user.is_following(user):
        return jsonify(message="Already following this user", statusCode=400), 400

    current_user.follow(user)
    db.session.commit()

    return jsonify(follower_id=current_user.id, following_id=user.id), 201

# Unfollow a User
@follow_routes.route('/<int:user_id>', methods=['DELETE'])
@login_required
def unfollow_user(user_id):
    if user_id == current_user.id:
        return jsonify(message="You cannot unfollow yourself", statusCode=400), 400

    user = User.query.get(user_id)
    if not user:
        return jsonify(message="User not found", statusCode=404), 404

    if not current_user.is_following(user):
        return jsonify(message="Not following this user", statusCode=400), 400

    current_user.unfollow(user)
    db.session.commit()

    return jsonify(message="Unfollowed successfully"), 200

# Get a User's Followers
@follow_routes.route('/<int:user_id>/followers', methods=['GET'])
@login_required
def get_followers(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify(message="User not found", statusCode=404), 404

    followers = [follower.to_dict() for follower in user.followers]
    return jsonify(followers), 200

# Get a User's Following
@follow_routes.route('/<int:user_id>/following', methods=['GET'])
@login_required
def get_following(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify(message="User not found", statusCode=404), 404

    following = [following.to_dict() for following in user.following]
    return jsonify(following), 200
