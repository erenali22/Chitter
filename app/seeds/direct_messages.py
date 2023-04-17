from app.models import db, User, DM, environment, SCHEMA

def seed_dms():
    users = User.query.order_by(User.id).limit(4).all()

    if len(users) < 4:
        print("Not enough users found. Please ensure there are at least 4 users in the database.")
        return

    demo_user = users[0]
    user1 = users[1]
    user2 = users[2]
    user3 = users[3]

    dm1 = DM(
        sender_id=demo_user.id,
        receiver_id=user1.id,
        content=' Finally, {}, "Elden Ring" Finally Announces Its DLC Expansion, "Shadow Of The Erdtree".'.format(user1.username)
    )

    dm2 = DM(
        sender_id=demo_user.id,
        receiver_id=user2.id,
        content='Hey {}! Hope all your birthday wishes come true!'.format(user2.username)
    )

    dm3 = DM(
        sender_id=demo_user.id,
        receiver_id=user3.id,
        content='Whataboutism is an argumentative tactic where a person or group responds to an accusation or difficult question by deflection. Instead of addressing the point made, they counter it with “but what about X?”'
    )

    db.session.add(dm1)
    db.session.add(dm2)
    db.session.add(dm3)
    db.session.commit()

def undo_dms():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.DMs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM DMs")

    db.session.commit()
