import random
from faker import Faker
from app.models.rechatter import db, Rechatter, environment, SCHEMA
from app import db
from emoji import emojize

fake = Faker()

emojis = [':joy:', ':heart:', ':thinking_face:', ':heart_eyes:', ':pray:', ':smiling_face_with_3_hearts:', ':100:', ':fire:', ':smiling_face_with_tear:', ':clapping_hands:', ':face_with_rolling_eyes:', ':loudly_crying_face:', ':smiling_face_with_horns:', ':unamused_face:', ':smirking_face:', ':face_with_symbols_on_mouth:', ':face_with_hand_over_mouth:', ':red_heart:', ':blue_heart:', ':purple_heart:']


def seed_rechatters(num_rechatters=100):
    user_ids = list(range(1, 41))
    chatter_ids = list(range(1, 101))

    for _ in range(num_rechatters):
        user_id = random.choice(user_ids)
        chatter_id = random.choice(chatter_ids)

        content = fake.text(max_nb_chars=280)
        if random.random() < 0.5:
            content += f" {emojize(random.choice(emojis))}"

        if random.random() < 0.1:
            content += f" #{fake.word()}"

        rechatter = Rechatter(
            user_id=user_id,
            chatter_id=chatter_id,
            content=content
        )
        db.session.add(rechatter)

    db.session.commit()

def undo_rechatters():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.rechatters RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM rechatters")

    db.session.commit()
