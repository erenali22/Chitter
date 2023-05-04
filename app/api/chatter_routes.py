from flask import Blueprint, jsonify, request, render_template, redirect, url_for, flash
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
@chatter_routes.route('/create', methods=['GET', 'POST'])
@login_required
def create_chatter():
    form = ChatterForm()
    if form.validate_on_submit():
        chatter = Chatter(
            user_id=current_user.id,
            content=form.data['content'],
        )

        db.session.add(chatter)
        db.session.commit()
        flash('Chatter has been posted!', 'success')
        return redirect(url_for('chatters.get_chatters'))

    return render_template('create_chatter.html', form=form, errors=form.errors)


# Update a chatter
@chatter_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_chatter(id):
    form = ChatterForm()
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
