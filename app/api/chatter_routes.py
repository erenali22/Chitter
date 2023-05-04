from flask import Blueprint, jsonify, request
from sqlalchemy import or_
from flask_login import current_user, login_required
from app.models import Chatter, Location, Like, db
from app.forms.chatter_form import ChatterForm


chatter_routes = Blueprint('chatters', __name__)

# Get all chatters
@chatter_routes.route('/')
def get_chatters():
    chatters = Chatter.query.all()
    return jsonify([chatter.to_dict() for chatter in chatters])

# Get a specific chatter
@chatter_routes.route('/<int:id>')
def get_chatter(id):
    chatter = Chatter.query.get(id)
    if chatter:
        return jsonify(chatter.to_dict())
    else:
        return {'error': 'Chatter not found'}, 404

# Create a new chatter
@chatter_routes.route('/', methods=['POST'])
@login_required
def create_chatter():
    form = ChatterForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        chatter = Chatter(
            user_id=current_user.id,
            content=form.data['content'],
        )

        # # Check if location data is provided and create a location
        # if form.data['location_name'] and form.data['latitude'] and form.data['longitude']:
        #     location = Location(
        #         name=form.data['location_name'],
        #         latitude=form.data['latitude'],
        #         longitude=form.data['longitude'],
        #     )
        #     db.session.add(location)
        #     db.session.flush()  # Flush the session to get the location ID

        #     chatter.location_id = location.id

        db.session.add(chatter)
        db.session.commit()
        return jsonify(chatter.to_dict()), 201

    return {'errors': form.errors}, 400

# Update a chatter
@chatter_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_chatter(id):
    json_data = request.get_json()

    if 'content' not in json_data:
        return {'error': 'Content is required'}, 400

    form = ChatterForm(data=json_data)
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        chatter = Chatter.query.get(id)
        if chatter and chatter.user_id == current_user.id:
            chatter.content = form.data['content']
            db.session.commit()
            return jsonify(chatter.to_dict())
        else:
            return {'error': 'Chatter not found or unauthorized'}, 404

    return {'errors': form.errors}, 400

# Delete a chatter
@chatter_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_chatter(id):
    chatter = Chatter.query.get(id)
    if chatter and chatter.user_id == current_user.id:
        db.session.delete(chatter)
        db.session.commit()
        return {'message': 'Chatter deleted'}
    else:
        return {'error': 'Chatter not found or unauthorized'}, 404

# Search chatters by hashtag
@chatter_routes.route('/hashtags/<hashtag>')
def search_hashtags(hashtag):
    chatters = Chatter.query.filter(Chatter.content.like(f'%#{hashtag}%')).all()
    return jsonify([chatter.to_dict() for chatter in chatters])

# Like a Chatter
@chatter_routes.route('/<int:id>/like', methods=['POST'])
@login_required
def like_chatter(id):
    chatter = Chatter.query.get(id)
    if chatter:
        like = Like(user_id=current_user.id, chatter_id=id)
        db.session.add(like)
        db.session.commit()
        return {'message': 'Chatter liked'}
    else:
        return {'error': 'Chatter not found'}, 404

# Unlike a Chatter
@chatter_routes.route('/<int:id>/unlike', methods=['POST'])
@login_required
def unlike_chatter(id):
    chatter = Chatter.query.get(id)
    if chatter:
        like = Like.query.filter_by(user_id=current_user.id, chatter_id=id).first()
        if like:
            db.session.delete(like)
            db.session.commit()
            return {'message': 'Chatter unliked'}
        else:
            return {'error': 'Like not found'}, 404
    else:
        return {'error': 'Chatter not found'}, 404
