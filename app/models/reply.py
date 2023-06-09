from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Reply(db.Model):
    __tablename__ = 'replies'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    chatter_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('chatters.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    chatter = db.relationship('Chatter', back_populates='replies')
    user = db.relationship('User', back_populates='replies')

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'user_id': self.user_id,
            'chatter_id': self.chatter_id,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
            "user": self.user.to_dict()
        }
