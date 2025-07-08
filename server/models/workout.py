from . import db

class Workout(db.Model):
    __tablename__ = 'workouts'

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(20), nullable=False)
    name = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    exercise_logs = db.relationship("ExerciseLog", back_populates="workout", cascade="all, delete-orphan")
    user = db.relationship("User", back_populates="workouts")

    def __repr__(self):
        return f"<Workout {self.id} on {self.date}>"
