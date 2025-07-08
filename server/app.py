from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_restful import Api
from dotenv import load_dotenv


load_dotenv()
 
 
from models import db
from resources.auth import RegisterResource, LoginResource
from resources.workouts import WorkoutListResource, WorkoutResource
from resources.exercises import ExerciseListResource
from resources.exercise_logs import ExerciseLogListResource


migrate = Migrate()
jwt = JWTManager()


def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    CORS(app)
    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)

    api = Api(app)

    # Auth
    api.add_resource(RegisterResource, '/auth/register')
    api.add_resource(LoginResource, '/auth/login')

    # Protected Routes
    api.add_resource(WorkoutListResource, '/workouts')
    api.add_resource(WorkoutResource, '/workouts/<int:id>')
    api.add_resource(ExerciseListResource, '/exercises')
    api.add_resource(ExerciseLogListResource, '/exercise-logs')

    return app

app = create_app()

if __name__ == '__main__':
    app.run(port=5555, debug=True)
