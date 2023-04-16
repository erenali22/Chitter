from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Rechatter(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    chatter_id = db.Column(db.Integer, db.ForeignKey('chatter.id'), nullable=False)
    content = db.Column(db.String(280), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "chatter_id": self.chatter_id,
            "content": self.content,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
        }
