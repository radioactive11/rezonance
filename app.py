from flask import Flask, request, jsonify
from flask_restful import Api, Resource
import search_query
import recoms

app = Flask(__name__)
api = Api(app)


class Search(Resource):
    def post(self):
        param = request.json["search_param"]
        search_results = search_query.query(param)
        return jsonify({"search_results": search_results})

api.add_resource(Search, "/search")


class Recommend(Resource):
    def post(self):
        id = request.json["id"
        recommend = recoms.generate_recoms(id)
        return recommend

api.add_resource(Recommend, "/recommend")


if __name__ == "__main__":
    app.run(debug=True)

