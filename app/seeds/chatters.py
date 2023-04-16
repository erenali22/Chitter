from app.models import db, Chatter, Location, User
from faker import Faker
from emoji import emojize
import random
from datetime import datetime, timedelta

fake = Faker()

emojis = [':smile:', ':grin:', ':wink:',':pleading_face:', ':dizzy:', ':hand_with_index_finger_and_thumb_crossed:', ':laughing:', ':heart:',':thumbs_up:',':smiling_face_with_halo:',':folded_hands:',':hot_beverage:',':partying_face:',':rainbow:', ':heart_eyes:', ':sunglasses:', ':thinking_face:', ':star-struck:', ':face_with_rolling_eyes:', ':fire:', ':exploding_head:', ':money_mouth_face:', ':clown_face:', ':alien:', ':skull_and_crossbones:', ':robot_face:', ':kissing_face:', ':musical_note:', ':unicorn_face:', ':crown:']

gif_urls = [
    "https://media.giphy.com/media/3ohfFrjeqcGR9XYX4I/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWQ0MWMwM2VhMDg1YjlhNzM4YTU2Nzc1OWVmNTQ5NjJiYTM3M2MzYSZjdD1n/MDJ9IbxxvDUQM/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWQ0MWMwM2VhMDg1YjlhNzM4YTU2Nzc1OWVmNTQ5NjJiYTM3M2MzYSZjdD1n/MDJ9IbxxvDUQM/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGIzMTllMjdmNjc3NzkzYTE5Y2ZlOGNhYTcwNTY3ZmEzNWYxN2ZlZiZjdD1n/GeimqsH0TLDt4tScGw/giphy.gif",
    "https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif"
]

def seed_chatters(num_chatters=100):
    for _ in range(num_chatters):
        # Random chatter with an emoji and a hashtag
        content = f"{fake.sentence()} {emojize(random.choice(emojis), use_aliases=True)}"
        if random.random() < 0.5:
            content += f" #{fake.word()}"

        # Random location
        latitude = fake.latitude()
        longitude = fake.longitude()
        location_name = fake.city()

        # Create a new Location
        location = Location(name=location_name, latitude=latitude, longitude=longitude)
        db.session.add(location)
        db.session.flush()

        # Random media_url and gif_url (with a probability of 20%)
        media_url = f"https://picsum.photos/200/300?random={random.randint(1, 1000)}"
        gif_url = random.choice(gif_urls) if random.random() < 0.1 else None

        # Generate random date within a range (last 1200 days)
        start_date = datetime.now() - timedelta(days=1200)
        random_date = start_date + timedelta(seconds=random.randint(0, int((datetime.now() - start_date).total_seconds())))

        # Create a new Chatter
        chatter = Chatter(
            user_id=random.randint(1, 40),
            content=content,
            location_id=location.id,
            media_url=media_url,
            gif_url=gif_url,
            created_at=random_date
        )
        db.session.add(chatter)

    db.session.commit()

def undo_chatters():
    db.session.execute('TRUNCATE chatters RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE locations RESTART IDENTITY CASCADE;')
    db.session.commit()
