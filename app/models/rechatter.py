from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Rechatter(db.Model):
    __tablename__ = 'rechatters'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    chatter_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('chatters.id')), nullable=False)
    content = db.Column(db.String(280), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    chatter = db.relationship('Chatter', back_populates='rechatters')
    user = db.relationship('User', back_populates='rechatters')
    
    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "chatter_id": self.chatter_id,
            "content": self.content,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
        }
