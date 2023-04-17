from .db import db
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

class Image(db.Model):
    __tablename__ = 'images'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    url = Column(String(255), nullable=False)

    user = relationship('User', back_populates='images')
