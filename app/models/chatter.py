from app.models import db
from datetime import datetime

class Location(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)

    chatters = db.relationship('Chatter', back_populates='location')

class Chatter(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    content = db.Column(db.String(280), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=True)
    media_url = db.Column(db.String, nullable=True) #for media upload with S3
    gif_url = db.Column(db.String, nullable=True) #for Giphy API
    latitude = db.Column(db.Float, nullable=True) #for tag location
    longitude = db.Column(db.Float, nullable=True) #for tag location
    location_id = db.Column(db.Integer, db.ForeignKey('locations.id'), nullable=True)

    location = db.relationship('Location', back_populates='chatters')

    user = db.relationship('User', back_populates='chatters')

    def __repr__(self):
        return f'<Chatter id={self.id} user_id={self.user_id} content="{self.content[:20]}">'
