

class Hashtag(db.Model):
    # ...

    chatters = db.relationship('Chatter', secondary='chatter_hashtags', back_populates='hashtags')

    # ...
