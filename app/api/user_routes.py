from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db
from app.forms import UpdateProfileForm

user_routes = Blueprint('users', __name__)

@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_user(id):
    """
    Update a user's information
    """
    form = UpdateProfileForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User.query.get(id)
        if user:
            user.username = form.data['username']
            user.email = form.data['email']
            user.profile_picture = form.data.get('profile_picture', user.profile_picture)
            user.bio = form.data.get('bio', user.bio)
            user.location = form.data.get('location', user.location)
            db.session.commit()
            return user.to_dict()
        else:
            return {'error': 'User not found'}, 404
    return {'errors': form.errors}, 400
