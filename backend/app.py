from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from utils import generate_prompt, generate_exam

app = Flask(__name__)
cors = CORS(app)


@app.route("/api/")
def hello_world():
    return "Hello, World!"


@app.route("/api/generate-exam", methods=["POST"])
def receive_data():
    data = request.get_json()
    num_questions = data.get("number_of_questions", None)
    question_type = data.get("questions_type", None)
    subject = data.get("subject", None)
    difficulty = data.get("difficulty", None)
    additional_info = data.get("additional_information", None)
    context_restriction = data.get("context_restriction")
    context_file = data.get("context", None)

    client = OpenAI(api_key=data.get("api_key"))
    prompt = generate_prompt(
        num_questions,
        question_type,
        subject,
        difficulty,
        additional_info,
        context_file,
        context_restriction,
    )
    exam = generate_exam(client, prompt)

    try:
        return jsonify({"message": "Exam generated successfully!", "exam": exam})

    except ValueError as ve:
        return jsonify({"error": str(ve)}), 500


if __name__ == "__main__":
    app.run(debug=True)
