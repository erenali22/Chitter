from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email

class UpdateProfileForm(FlaskForm):
    username = StringField('username', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired()])
    profile_picture = StringField('profile_picture')
    bio = StringField('bio')
    location = StringField('location')
