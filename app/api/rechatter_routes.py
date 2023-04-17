from flask import Blueprint, jsonify, request
from app.models import db, Rechatter, Chatter, User
from app.forms import RechatterForm
from flask_login import current_user, login_required
from .utils import validation_errors_to_error_messages

rechatter_routes = Blueprint('rechatters', __name__)

# Create a Rechatter
@rechatter_routes.route('/', methods=['POST'])
@login_required
def create_rechatter():
    form = RechatterForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        rechatter = Rechatter(
            user_id=current_user.id,
            chatter_id=form.data['chatter_id'],
            content=form.data['content']
        )
        db.session.add(rechatter)
        db.session.commit()
        return jsonify(**rechatter.to_dict()), 200
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# Get Rechatters for a Chatter
@rechatter_routes.route('/chatters/<int:chatter_id>', methods=['GET'])
def get_rechatters(chatter_id):
    rechatters = Rechatter.query.filter_by(chatter_id=chatter_id).all()
    return jsonify([rechatter.to_dict() for rechatter in rechatters]), 200

# Update a Rechatter
@rechatter_routes.route('/<int:rechatter_id>', methods=['PUT'])
@login_required
def update_rechatter(rechatter_id):
    rechatter = Rechatter.query.get(rechatter_id)
    if not rechatter or rechatter.user_id != current_user.id:
        return jsonify(message="Rechatter not found or not owned by the user", statusCode=404), 404

    content = request.json.get('content')
    if content is not None:
        rechatter.content = content
        db.session.commit()
        return jsonify(**rechatter.to_dict()), 200
    return jsonify(message="Content is required", statusCode=400), 400

# Delete a Rechatter
@rechatter_routes.route('/<int:rechatter_id>', methods=['DELETE'])
@login_required
def delete_rechatter(rechatter_id):
    rechatter = Rechatter.query.get(rechatter_id)
    if not rechatter or rechatter.user_id != current_user.id:
        return jsonify(message="Rechatter not found or not owned by the user", statusCode=404), 404

    db.session.delete(rechatter)
    db.session.commit()

    return jsonify(message="Rechatter deleted", statusCode=200), 200
