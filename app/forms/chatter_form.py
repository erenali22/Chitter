from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField
from wtforms.validators import DataRequired, ValidationError, Optional

class ChatterForm(FlaskForm):
    # user_id = IntegerField('user_id', validators=[DataRequired()])
    content = StringField('content', validators=[DataRequired()])
    location_name = StringField('location_name', validators=[Optional()])
<<<<<<< HEAD
    latitude = FloatField('latitude', validators=[Optional()])
    longitude = FloatField('longitude', validators=[Optional()])
    media_url = StringField('media_url', validators=[Optional()])
    gif_url = StringField('gif_url', validators=[Optional()])
=======
    # latitude = FloatField('latitude', validators=[Optional()])
    # longitude = FloatField('longitude', validators=[Optional()])
>>>>>>> backend-chatter
