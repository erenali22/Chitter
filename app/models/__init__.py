from .db import db
from .user import User
from .chatter import Chatter, Location
from .rechatter import Rechatter
from .reply import Reply
from .direct_message import DM
from .like import Like
from .hashtag import Hashtag

from .db import environment, SCHEMA

chatter_hashtags = db.Table(
    'chatter_hashtags',
    db.Column('chatter_id', db.Integer, db.ForeignKey('chatters.id'), primary_key=True),
    db.Column('hashtag_id', db.Integer, db.ForeignKey('hashtags.id'), primary_key=True)
)
