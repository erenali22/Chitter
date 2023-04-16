from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired

class ReplyForm(FlaskForm):
    content = StringField('Reply', validators=[DataRequired()])
    submit = SubmitField('Submit')
