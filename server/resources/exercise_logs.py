from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db
from models.exercise_log import ExerciseLog
from models.workout import Workout

parser = reqparse.RequestParser()
parser.add_argument("sets", type=int, required=True)
parser.add_argument("reps", type=int, required=True)
parser.add_argument("weight", type=float)
parser.add_argument("exercise_id", type=int, required=True)
parser.add_argument("workout_id", type=int, required=True)

class ExerciseLogListResource(Resource):
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        data = parser.parse_args()

        # 🔒 Ensure workout belongs to the current user
        workout = Workout.query.get(data["workout_id"])
        if not workout or workout.user_id != user_id:
            return {"error": "Unauthorized to add log to this workout"}, 403

        log = ExerciseLog(
            sets=data["sets"],
            reps=data["reps"],
            weight=data["weight"],
            workout_id=data["workout_id"],
            exercise_id=data["exercise_id"]
        )

        db.session.add(log)
        db.session.commit()

        return {"message": "Exercise log created", "id": log.id}, 201

    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()

        # Only return logs for workouts that belong to the current user
        logs = (
            ExerciseLog.query.join(Workout)
            .filter(Workout.user_id == user_id)
            .all()
        )

        return [
            {
                "id": log.id,
                "sets": log.sets,
                "reps": log.reps,
                "weight": log.weight,
                "exercise_id": log.exercise_id,
                "workout_id": log.workout_id,
            }
            for log in logs
        ], 200
