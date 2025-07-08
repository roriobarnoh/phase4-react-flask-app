# seed.py

from app import app
from models import db, User, Workout, Exercise, ExerciseLog
from datetime import datetime
from werkzeug.security import generate_password_hash
import random

# Sample data
EXERCISES = ["Push-ups", "Squats", "Running", "Cycling", "Bench Press", "Deadlift"]
INTENSITIES = ["Low", "Medium", "High"]

def seed_data():
    with app.app_context():
        # Reset the database
        print("Dropping all tables...")
        db.drop_all()
        db.create_all()
        print("Tables recreated.")

        # Create Users
        print("Seeding users...")
        user1 = User(username="brian_fitness")
        user1.set_password("password123")

        user2 = User(username="fit_champ")
        user2.set_password("secure456")

        db.session.add_all([user1, user2])
        db.session.commit()

        # Create Exercises
        print("Seeding exercises...")
        exercises = [Exercise(name=name) for name in EXERCISES]
        db.session.add_all(exercises)
        db.session.commit()

        # Create Workouts
        print("Seeding workouts...")
        workout1 = Workout(date="2025-07-07", name="Morning Routine", user_id=user1.id)
        workout2 = Workout(date="2025-07-06", name="Leg Day", user_id=user2.id)
        db.session.add_all([workout1, workout2])
        db.session.commit()

        # Create Exercise Logs
        print("Seeding exercise logs...")
        logs = [
            ExerciseLog(
                user_id=user1.id,
                workout_id=workout1.id,
                exercise_id=random.choice(exercises).id,
                duration_minutes=random.randint(10, 60),
                intensity=random.choice(INTENSITIES)
            )
            for _ in range(3)
        ] + [
            ExerciseLog(
                user_id=user2.id,
                workout_id=workout2.id,
                exercise_id=random.choice(exercises).id,
                duration_minutes=random.randint(10, 60),
                intensity=random.choice(INTENSITIES)
            )
            for _ in range(2)
        ]

        db.session.add_all(logs)
        db.session.commit()

        print("✅ Done seeding the database!")


if __name__ == "__main__":
    seed_data()
