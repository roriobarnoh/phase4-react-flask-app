from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required
from models import db
from models.exercise import Exercise

# Parse JSON request body
parser = reqparse.RequestParser()
parser.add_argument("name", type=str, required=True, help="Exercise name is required")

class ExerciseListResource(Resource):
    def get(self):
        """
        Public route: returns all exercises.
        """
        exercises = Exercise.query.all()
        return [
            {"id": e.id, "name": e.name}
            for e in exercises
        ], 200

    @jwt_required()
    def post(self):
        """
        Protected route: only logged-in users can create exercises.
        """
        data = parser.parse_args()

        # Prevent duplicate names
        if Exercise.query.filter_by(name=data["name"]).first():
            return {"error": "Exercise already exists"}, 400

        new_exercise = Exercise(name=data["name"])
        db.session.add(new_exercise)
        db.session.commit()

        return {"message": "Exercise created", "id": new_exercise.id}, 201
