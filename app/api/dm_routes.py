from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db, DM, User
from app.forms import DMForm
from .utils import validation_errors_to_error_messages

dm_routes = Blueprint('dms', __name__)

@dm_routes.route('/', methods=['POST'])
@login_required
def send_dm():
    form = DMForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        dm = DM(
            sender_id=current_user.id,
            receiver_id=form.data['receiver_id'],
            content=form.data['content']
        )
        db.session.add(dm)
        db.session.commit()
        return jsonify(dm.to_dict()), 201
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@dm_routes.route('/<int:user_id>', methods=['GET'])
@login_required
def get_dms(user_id):
    dms = DM.query.filter(
        (DM.sender_id == current_user.id) & (DM.receiver_id == user_id) |
        (DM.sender_id == user_id) & (DM.receiver_id == current_user.id)
    ).order_by(DM.timestamp).all()
    return jsonify([dm.to_dict() for dm in dms]), 200
