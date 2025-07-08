from flask_restful import Resource, reqparse
from flask import request
from flask_jwt_extended import create_access_token
from models import db
from models.user import User
from werkzeug.security import generate_password_hash, check_password_hash

parser = reqparse.RequestParser()
parser.add_argument("username", type=str, required=True)
parser.add_argument("password", type=str, required=True)

class RegisterResource(Resource):
    def post(self):
        data = parser.parse_args()

        if User.query.filter_by(username=data['username']).first():
            return {"error": "Username already exists"}, 400

        user = User(username=data['username'], password_hash=generate_password_hash(data['password']))
        db.session.add(user)
        db.session.commit()

        return {"message": "User registered successfully"}, 201
    

class LoginResource(Resource):
    def post(self):
        data = parser.parse_args()
        user = User.query.filter_by(username=data['username']).first()

        if not user or not check_password_hash(user.password_hash, data['password']):
            return {"error": "Invalid credentials"}, 401

        token = create_access_token(identity=user.id)
        return {"message": "Login successful", "token": token}, 200
