from flask import Flask
from flask import url_for, redirect, render_template, request
import search_resolve

app = Flask(__name__)


@app.route('/search_result=<qry>', methods=["POST", "GET"])
def search_result(qry):
    if request.method == "POST":
        sid = request.form["selected"]
        print(sid)
        return redirect(url_for("recom", id=sid))
    else:
        song_names, song_ids = search_resolve.get_results(qry)
        return render_template("search_result.html", song_ids=song_ids, song_names=song_names, length=len(song_ids))


@app.route('/', methods=["POST", "GET"])
def search():
    if request.method == "POST":
        song_name = request.form["search_bar"]
        return redirect(url_for("search_result", qry=song_name))
    else:
        return render_template("search.html")


@app.route("/song_id=<id>")
def recom(id):

    return render_template("recom.html", id=id)


if __name__ == '__main__':
    app.run(debug=True)
