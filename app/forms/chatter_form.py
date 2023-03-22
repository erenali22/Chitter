from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField, StringField
from wtforms.validators import DataRequired, Length, Optional

class ChatterForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    content = TextAreaField('content', validators=[DataRequired(), Length(max=280)])
    location = StringField('location', validators=[Optional()])
