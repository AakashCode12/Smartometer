from flash import Flask
from flask_restful import Resource ,Api, reqparse

app= Flask(__name__)
api=Api(app)