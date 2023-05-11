from flask import Blueprint, jsonify, request
from app.models import db, Chatter, Reply, User
from app.forms import ReplyForm
from flask_login import current_user, login_required
from .utils import validation_errors_to_error_messages

reply_routes = Blueprint('replies', __name__)

# Create a Reply
@reply_routes.route('/chatters/<int:chatter_id>/replies', methods=['POST'])
@login_required
def create_reply(chatter_id):
    chatter = Chatter.query.get(chatter_id)
    if not chatter:
        return jsonify(message="Chatter not found", statusCode=404), 404

    form = ReplyForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        reply = Reply(
            content=form.data['content'],
            user_id=current_user.id,
            chatter_id=chatter_id
        )
        db.session.add(reply)
        db.session.commit()
        return jsonify(message="Reply created", **reply.to_dict()), 201
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

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
@login_required
def update_reply(reply_id):
    reply = Reply.query.get(reply_id)
    if not reply or reply.user_id != current_user.id:
        return jsonify(message="Reply not found or not owned by the user", statusCode=404), 404

    form = ReplyForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form.process(data=request.json)

    if form.validate_on_submit():
        content = form.content.data.strip()
        reply.content = content
        db.session.commit()

        return jsonify(message="Reply updated", **reply.to_dict()), 200
    else:
        return jsonify(errors=form.errors), 400

# Delete a Reply
@reply_routes.route('/replies/<int:reply_id>', methods=['DELETE'])
@login_required
def delete_reply(reply_id):
    reply = Reply.query.get(reply_id)
    if not reply or reply.user_id != current_user.id:
        return jsonify(message="Reply not found or not owned by the user", statusCode=404), 404

    db.session.delete(reply)
    db.session.commit()

    return jsonify(message="Reply deleted", statusCode=200), 200
