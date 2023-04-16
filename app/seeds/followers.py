from app.models import db, User, environment, SCHEMA
from faker import Faker

fake = Faker()

def seed_followers():
    users = User.query.all()
    num_users = len(users)

    for user in users:
        # Randomly select other users that this user should follow
        num_following = fake.random_int(min=0, max=num_users // 2)
        following_users = fake.random_elements(elements=users, length=num_following, unique=True)

        following_users = [u for u in following_users if u.id != user.id]

        # Following list
        user.following = following_users

    db.session.commit()

def undo_followers():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.follows RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM follows")

    db.session.commit()
