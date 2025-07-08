from . import db

class ExerciseLog(db.Model):
    __tablename__ = 'exercise_logs'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    workout_id = db.Column(db.Integer, db.ForeignKey('workouts.id'), nullable=False)
    exercise_id = db.Column(db.Integer, db.ForeignKey('exercises.id'), nullable=False)
    duration_minutes = db.Column(db.Integer)
    intensity = db.Column(db.String)

    user = db.relationship("User", back_populates="exercise_logs")
    workout = db.relationship("Workout", back_populates="exercise_logs")
    exercise = db.relationship("Exercise", back_populates="exercise_logs")

    def __repr__(self):
        return f"<ExerciseLog {self.id} | Workout {self.workout_id} | User {self.user_id}>"
