# from .db import db, environment, SCHEMA, add_prefix_for_prod

# class Hashtag(db.Model):
#     __tablename__ = 'hashtags'

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     tag = db.Column(db.String(50), nullable=False, unique=True)

#     chatters = db.relationship('Chatter', secondary='chatter_hashtags', back_populates='hashtags')

#     def to_dict(self):
#         return {
#             "id": self.id,
#             "tag": self.tag,
#         }
