from .db import db
from datetime import datetime

class Reply(db.Model):
    __tablename__ = 'replies'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    chatter_id = db.Column(db.Integer, db.ForeignKey('chatters.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    chatter = db.relationship('Chatter', back_populates='replies')
    user = db.relationship('User', back_populates='replies')
