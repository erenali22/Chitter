from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Like(db.Model):
    __tablename__ = 'likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)
    chatter_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('chatters.id')), primary_key=True)
    user = db.relationship('User', back_populates='likes')
    chatter = db.relationship('Chatter', back_populates='likes')
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
