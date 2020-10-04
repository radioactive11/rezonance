from flask import Flask, request, jsonify
from flask_restful import Api, Resource
from flask_cors import CORS, cross_origin
from show_random import send_results
import search_query
import recoms

app = Flask(__name__)
CORS(app)
api = Api(app)


class Search(Resource):
    def post(self):
        param = request.json["search_param"]
        search_results = search_query.query(param)
        return jsonify({"search_results": search_results})

api.add_resource(Search, "/search")


class Recommend(Resource):
    def post(self):
        id = request.json["id"]
        recommend = recoms.generate_recoms(id)
        return recommend

api.add_resource(Recommend, "/recommend")



class RandomSongs(Resource):
    def get(self):
        song_list = send_results()
        return song_list

api.add_resource(RandomSongs, "/random")


if __name__ == "__main__":
    app.run(debug=True)

