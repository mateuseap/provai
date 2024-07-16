from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from utils import generate_exam

app = Flask(__name__)
cors = CORS(app)


@app.route("/api/")
def hello_world():
    return "Hello, World!"


@app.route("/api/generate-exam", methods=["POST"])
def receive_data():
    data = request.get_json()
    context = data.get("context")
    client = OpenAI(api_key=data.get("api_key"))

    try:
        questions = generate_exam(client, context)

        return jsonify(
            {"message": "Exam generated successfully!", "questions": questions}
        )

    except ValueError as ve:
        return jsonify({"error": str(ve)}), 500


if __name__ == "__main__":
    app.run(debug=True)
