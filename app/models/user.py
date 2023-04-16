from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .chatter import Chatter
from datetime import datetime

follows = db.Table(
    'follows',
    db.Column('follower_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('followed_id', db.Integer, db.ForeignKey('users.id'))
)
class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_picture = db.Column(db.String, default="https://cataas.com/cat")
    bio = db.Column(db.String, nullable=True)
    location = db.Column(db.String, nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=True)

    chatters = db.relationship('Chatter', back_populates='user', cascade='all, delete-orphan')
    replies = db.relationship('Reply', back_populates='user', cascade='all, delete-orphan')
    followers = db.relationship(
        'User',
        secondary=follows,
        primaryjoin=(id == follows.c.followed_id),
        secondaryjoin=(id == follows.c.follower_id),
        backref=db.backref('following', lazy='dynamic'),
        lazy='dynamic'
    )

    likes = db.relationship('Like', back_populates='user')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def follow(self, user):
        """
        Follow the given user if not already following.

        :param user: User instance to follow
        """
        if not self.is_following(user):
            self.following.append(user)

    def unfollow(self, user):
        """
        Unfollow the given user if currently following.

        :param user: User instance to unfollow
        """
        if self.is_following(user):
            self.following.remove(user)

    def is_following(self, user):
        """
        Check if the current user is following the given user.

        :param user: User instance to check if being followed
        :return: True if following, False otherwise
        """
        return self.following.filter(follows.c.followed_id == user.id).count() > 0

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'profile_picture': self.profile_picture,
            'bio': self.bio,
            'location': self.location,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
