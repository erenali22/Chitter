from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Location(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)

    chatters = db.relationship('Chatter', back_populates='location')

    def to_dict(self):
        return {
        'id': self.id,
        'name': self.name,
        'latitude': self.latitude,
        'longitude': self.longitude
    }

class Chatter(db.Model):
    __tablename__ = 'chatters'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    content = db.Column(db.String(280), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=True)
    media_url = db.Column(db.String, nullable=True) #for media upload with S3
    gif_url = db.Column(db.String, nullable=True) #for Giphy API
    location_id = db.Column(db.Integer, db.ForeignKey('locations.id'), nullable=True)

    location = db.relationship('Location', back_populates='chatters')
    user = db.relationship('User', back_populates='chatters')

    likes = db.relationship('Like', back_populates='chatter')
    replies = db.relationship('Reply', back_populates='chatter', cascade='all, delete-orphan')
    rechatters = db.relationship('Rechatter', back_populates='chatter')
    hashtags = db.relationship('Hashtag', secondary='chatter_hashtags', back_populates='chatters')

    def __repr__(self):
        return f'<Chatter id={self.id} user_id={self.user_id} content="{self.content[:20]}">'

    def to_dict(self):
        return {
        'id': self.id,
        'user_id': self.user_id,
        'content': self.content,
        'created_at': self.created_at,
        'updated_at': self.updated_at,
        'media_url': self.media_url,
        'gif_url': self.gif_url,
        'location': self.location.to_dict() if self.location else None
    }
