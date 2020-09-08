from flask import Flask, request, jsonify
from flask_restful import Api, Resource
import search_query

app = Flask(__name__)
api = Api(app)


class Search(Resource):
    def post(self):
        param = request.json["search_param"]
        search_results = search_query.query(param)
        print(search_results)
        return jsonify({"search_results": search_results})


api.add_resource(Search, "/search")


if __name__ == "__main__":
    app.run(debug=True)

