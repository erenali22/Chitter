from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length

class DMForm(FlaskForm):
    receiver_id = IntegerField('receiver_id', validators=[DataRequired()])
    content = StringField('content', validators=[DataRequired(), Length(max=1000)])

