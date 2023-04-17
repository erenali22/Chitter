from app.models import User, db, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
import random

fake = Faker()

def seed_users():
    demo = User(
        username='Demo',
        email='demo@aa.io',
        password='password',
        profile_picture="https://cataas.com/cat",
        bio="Demo user's bio",
        location="Demo City"
    )
    db.session.add(demo)
    db.session.commit()

    users = [demo]
    for _ in range(40):
        user = User(
            username=fake.unique.user_name(),
            email=fake.unique.email(),
            password=fake.password(),
            profile_picture="https://cataas.com/cat",
            bio=fake.sentence(),
            location=fake.city()
        )
        users.append(user)

    db.session.bulk_save_objects(users)
    db.session.commit()

    for i in range(1, 41):
        following = set()
        for _ in range(random.randint(1, 5)):
            follow_id = random.randint(1, 40)
            if follow_id != i and follow_id not in following:
                following.add(follow_id)
                users[i].following.append(users[follow_id])

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
