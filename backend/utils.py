def generate_prompt(
    num_questions,
    primary_instructions,
    question_type,
    subject,
    difficulty,
    context_text,
    context_restriction,
):
    prompt = ""
    if context_text:
        prompt += f"Use the following context as the primary source of information.\nContexto: {context_text}\n"
        prompt += 'The student will not have access to the context during the test, but he studied it previously. Do not make explicit reference to the context, for example "According to the text", as the text will not be in the test, but the answers must be in accordance with the context.\n'
        prompt += "If there are conflicting details, make a note at the end but prioritize the content in the context provided.\n"

    prompt += f"Generate an exam with the following parameters:\n"
    if subject:
        prompt += f"- Subject: {subject}\n"
    if question_type:
        prompt += f"- Question type: {question_type}\n"
    if num_questions:
        prompt += f"- Number of questions: {num_questions}\n"
    if difficulty:
        level = (
            "easy"
            if difficulty == "fácil"
            else "medium" if difficulty == "médio" else "hard"
        )

        prompt += (
            "Make the questions with a level of difficulty that is "
            + level
            + ". Consider the following parameters:\n"
        )
        if level == "easy":
            prompt += "- The questions should be straightforward and require basic knowledge.\n"
            prompt += "- The questions should focus on fundamental concepts and simple facts.\n"
        elif level == "medium":
            prompt += "- The questions should require a moderate level of reasoning and understanding.\n"
            prompt += "- The questions should integrate multiple concepts and require some analysis.\n"
        elif level == "hard":
            prompt += "- The questions should require deep understanding and advanced reasoning.\n"
            prompt += "- The questions should involve complex problem-solving and critical thinking.\n"

    if primary_instructions:
        prompt += "Prioritize user instructions over the predefined parameters.\n"
        prompt += f"\nUser instructions:\n{primary_instructions}\n"

    prompt += "Add the answers key and correction instructions to the end.\n"
    prompt += "The output must be in markdown format, divided into the following optional sections: subject, instructions for solving the questions, questions, answer keys (contains the complete answer for the questions), correction instructions (for example, if the question type is essay, highlight important topics in detail to help the teacher make an objective correction), and alerts."

    if context_restriction:
        prompt += "Restrict to the content of the context provided.\n"
    else:
        prompt += "Use the context content provided, but don't limit to it.\n"

    prompt += (
        "Generate in the same language as the context, user instructions or subject"
    )

    return prompt


def generate_exam(client, prompt, question_type):
    functions = [
        {
            "name": "structure_multiple_choice_exam",
            "description": "Structure the output of the exam generated.",
            "parameters": {
                "type": "object",
                "properties": {
                    "subject": {
                        "type": "string",
                        "description": "The subject of the exam.",
                    },
                    "instructions": {
                        "type": "array",
                        "description": "Instructions for solving the questions.",
                        "items": {"type": "string"},
                    },
                    "questions": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "question_number": {
                                    "type": "integer",
                                    "description": "The number of the question.",
                                },
                                "question": {
                                    "type": "string",
                                    "description": "The question to be answered.",
                                },
                                "options": {
                                    "type": "array",
                                    "description": "The options for the question.",
                                    "items": {"type": "string"},
                                },
                            },
                        },
                    },
                    "answers": {
                        "type": "array",
                        "description": "The answers for the questions.",
                        "items": {
                            "type": "object",
                            "properties": {
                                "question_number": {
                                    "type": "integer",
                                    "description": "The number of the question.",
                                },
                                "answer": {
                                    "type": "string",
                                    "description": "The answer for the question.",
                                },
                            },
                        },
                    },
                    "correction_instructions": {
                        "type": "array",
                        "description": "Instructions for correcting the exam.",
                        "items": {"type": "string"},
                    },
                    "alerts": {
                        "type": "array",
                        "description": "Alerts for the exam.",
                        "items": {"type": "string"},
                    },
                },
                "required": [
                    "subject",
                    "instructions",
                    "questions",
                    "answers",
                    "correction_instructions",
                    "alerts",
                ],
            },
        },
        {
            "name": "structure_open_ended_exam",
            "description": "Structure the output of the exam generated.",
            "parameters": {
                "type": "object",
                "properties": {
                    "subject": {
                        "type": "string",
                        "description": "The subject of the exam.",
                    },
                    "instructions": {
                        "type": "array",
                        "description": "Instructions for solving the questions.",
                        "items": {"type": "string"},
                    },
                    "questions": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "question_number": {
                                    "type": "integer",
                                    "description": "The number of the question.",
                                },
                                "question": {
                                    "type": "string",
                                    "description": "The question to be answered.",
                                },
                            },
                        },
                    },
                    "answers": {
                        "type": "array",
                        "description": "The answers for the questions.",
                        "items": {
                            "type": "object",
                            "properties": {
                                "question_number": {
                                    "type": "integer",
                                    "description": "The number of the question.",
                                },
                                "answer": {
                                    "type": "string",
                                    "description": "The answer for the question.",
                                },
                            },
                        },
                    },
                    "correction_instructions": {
                        "type": "array",
                        "description": "Instructions for correcting the exam.",
                        "items": {"type": "string"},
                    },
                    "alerts": {
                        "type": "array",
                        "description": "Alerts for the exam.",
                        "items": {"type": "string"},
                    },
                },
                "required": [
                    "subject",
                    "instructions",
                    "questions",
                    "answers",
                    "correction_instructions",
                    "alerts",
                ],
            },
        },
    ]

    chosen_function = (
        "structure_multiple_choice_exam"
        if question_type == "múltipla escolha"
        else "structure_open_ended_exam"
    )

    response = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": "You are an expert in creating exam questions.",
            },
            {"role": "user", "content": prompt},
        ],
        model="gpt-4o",
        functions=functions,
        function_call={"name": chosen_function},
    )

    return response.choices[0].message.function_call.arguments
