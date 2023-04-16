from .db import db, environment, SCHEMA
from datetime import datetime
class Like(db.Model):
    __tablename__ = 'likes'
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    chatter_id = db.Column(db.Integer, db.ForeignKey('chatters.id'), primary_key=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
