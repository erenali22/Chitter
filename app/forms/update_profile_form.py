from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, EqualTo, ValidationError
from app.models import User

def user_exists(form, field):
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user and user.id != form.user_id:
        raise ValidationError('Email address is already in use.')

def username_exists(form, field):
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user and user.id != form.user_id:
        raise ValidationError('Username is already in use.')

class UpdateProfileForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    profile_picture = StringField('profile_picture')
    bio = StringField('bio')
    location = StringField('location')
    new_password = StringField('new_password')
    confirm_new_password = StringField('confirm_new_password', validators=[EqualTo('new_password', message='Passwords must match.')])
