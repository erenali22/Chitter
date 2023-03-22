from flask import Blueprint, jsonify, request
from sqlalchemy import or_
from app.models import Chatter, Location, db
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
def create_chatter():
    form = ChatterForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        chatter = Chatter(
            user_id=form.data['user_id'],
            content=form.data['content'],
        )

        # Check if location data is provided and create a location
        if form.data['location_name'] and form.data['latitude'] and form.data['longitude']:
            location = Location(
                name=form.data['location_name'],
                latitude=form.data['latitude'],
                longitude=form.data['longitude'],
            )
            db.session.add(location)
            db.session.flush()  # Flush the session to get the location ID

            chatter.location_id = location.id

        db.session.add(chatter)
        db.session.commit()
        return jsonify(chatter.to_dict()), 201

    return {'errors': form.errors}, 400

# Update a chatter
@chatter_routes.route('/<int:id>', methods=['PUT'])
def update_chatter(id):
    form = ChatterForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        chatter = Chatter.query.get(id)
        if chatter:
            chatter.content = form.data['content']
            db.session.commit()
            return jsonify(chatter.to_dict())
        else:
            return {'error': 'Chatter not found'}, 404
    return {'errors': form.errors}, 400

# Delete a chatter
@chatter_routes.route('/<int:id>', methods=['DELETE'])
def delete_chatter(id):
    chatter = Chatter.query.get(id)
    if chatter:
        db.session.delete(chatter)
        db.session.commit()
        return {'message': 'Chatter deleted'}
    else:
        return {'error': 'Chatter not found'}, 404

# Search chatters by hashtag
@chatter_routes.route('/hashtags/<hashtag>')
def search_hashtags(hashtag):
    chatters = Chatter.query.filter(Chatter.content.like(f'%#{hashtag}%')).all()
    return jsonify([chatter.to_dict() for chatter in chatters])
