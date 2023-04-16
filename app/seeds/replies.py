from app.models import db, Reply, Chatter, User
from faker import Faker
from emoji import emojize
import random

fake = Faker()

def seed_replies(num_replies=50):
    emojis = [':joy:', ':heart:', ':thinking_face:', ':heart_eyes:', ':pray:', ':smiling_face_with_3_hearts:', ':100:', ':fire:', ':smiling_face_with_tear:', ':clapping_hands:', ':face_with_rolling_eyes:', ':loudly_crying_face:', ':smiling_face_with_horns:', ':unamused_face:', ':smirking_face:', ':face_with_symbols_on_mouth:', ':face_with_hand_over_mouth:', ':red_heart:', ':blue_heart:', ':purple_heart:']


    min_user_id, max_user_id = 1, 40
    min_chatter_id, max_chatter_id = 1, 100

    for _ in range(num_replies):
        content = fake.sentence()

        if random.random() < 0.5:
            content += ' ' + emojize(random.choice(emojis), use_aliases=True)

        reply = Reply(
            user_id=random.randint(min_user_id, max_user_id),
            chatter_id=random.randint(min_chatter_id, max_chatter_id),
            content=content[:280]
        )
        db.session.add(reply)

    db.session.commit()

def undo_replies():
    db.session.execute('TRUNCATE replies RESTART IDENTITY CASCADE;')
    db.session.commit()
