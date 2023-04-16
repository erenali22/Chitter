from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Optional

class RechatterForm(FlaskForm):
    chatter_id = IntegerField('chatter_id', validators=[DataRequired()])
    content = StringField('content', validators=[Optional()])
