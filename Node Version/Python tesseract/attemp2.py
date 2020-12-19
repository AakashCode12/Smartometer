from flask import Flask ,redirect, url_for
app= Flask(__name__)

@app.route("/")
def home():
    return "hello world main page"

@app.route("/<name>")
def user(name):
    return f"Hello {name}!"

@app.route("/admin")


if __name__ == "__main__":
    app.run()