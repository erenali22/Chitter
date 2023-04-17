from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Chatter
from app.forms import UpdateProfileForm
from .utils import validation_errors_to_error_messages

user_routes = Blueprint('users', __name__)

# @user_routes.route('/check-auth')
# def check_auth():
#     if current_user.is_authenticated:
#         print("Current User (Check Auth):", current_user)
#         return {"message": "Authenticated"}
#     else:
#         return {"message": "Not Authenticated"}

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
    form = UpdateProfileForm(user_id=current_user.id, **request.form)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User.query.get(id)
        if user:
            user.username = form.data['username']
            user.email = form.data['email']
            user.profile_picture = form.data.get('profile_picture', user.profile_picture)
            user.bio = form.data.get('bio', user.bio)
            user.location = form.data.get('location', user.location)

            if form.data['new_password']:
                user.password = form.data['new_password']

            db.session.commit()
            return user.to_dict()
        else:
            return {'error': 'User not found'}, 404
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@user_routes.route('/feed')
@login_required
def user_feed():
    """
    Fetches the Chatters from the users that the current user follows
    """
    following_ids = [user.id for user in current_user.following]
    chatters = Chatter.query.filter(Chatter.user_id.in_(following_ids)).order_by(Chatter.created_at.desc()).all()
    return {'chatters': [chatter.to_dict() for chatter in chatters]}
