from .db import db
from .user import User
from .chatter import Chatter, Location
from .rechatter import Rechatter
from .reply import Reply
from .direct_message import DM
from .like import Like
# from .hashtag import Hashtag

from .db import environment, SCHEMA, add_prefix_for_prod

# chatter_hashtags = db.Table(
#     'chatter_hashtags',
#     db.Column('chatter_id', db.Integer, db.ForeignKey(add_prefix_for_prod('chatters.id')), primary_key=True),
#     db.Column('hashtag_id', db.Integer, db.ForeignKey(add_prefix_for_prod('hashtags.id')), primary_key=True)
# )
