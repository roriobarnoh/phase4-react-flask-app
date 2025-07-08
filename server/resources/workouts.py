from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db
from models.workout import Workout

parser = reqparse.RequestParser()
parser.add_argument("date", type=str, required=True)

class WorkoutListResource(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        workouts = Workout.query.filter_by(user_id=user_id).all()
        return [{"id": w.id, "date": w.date} for w in workouts]

    @jwt_required()
    def post(self):
        data = parser.parse_args()
        user_id = get_jwt_identity()
        workout = Workout(date=data['date'], user_id=user_id)
        db.session.add(workout)
        db.session.commit()
        return {"message": "Workout created", "id": workout.id}, 201

class WorkoutResource(Resource):
    @jwt_required()
    def get(self, id):
        user_id = get_jwt_identity()
        workout = Workout.query.get_or_404(id)

        if workout.user_id != user_id:
            return {"error": "Unauthorized"}, 403

        return {"id": workout.id, "date": workout.date}

    @jwt_required()
    def put(self, id):
        user_id = get_jwt_identity()
        workout = Workout.query.get_or_404(id)

        if workout.user_id != user_id:
            return {"error": "Unauthorized"}, 403

        data = parser.parse_args()
        workout.date = data['date']
        db.session.commit()
        return {"message": "Workout updated"}

    @jwt_required()
    def delete(self, id):
        user_id = get_jwt_identity()
        workout = Workout.query.get_or_404(id)

        if workout.user_id != user_id:
            return {"error": "Unauthorized"}, 403

        db.session.delete(workout)
        db.session.commit()
        return {"message": "Workout deleted"}
