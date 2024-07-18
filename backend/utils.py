def generate_prompt(
    num_questions,
    question_type,
    subject,
    difficulty,
    additional_info,
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
        prompt += f"- Difficulty level: {difficulty}\n"

    if additional_info:
        prompt += "Prioritize user instructions over the predefined parameters.\n"
        prompt += f"\nUser instructions:\n{additional_info}\n"

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


def generate_exam(client, prompt):
    response = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": "You are an expert in creating exam questions.",
            },
            {"role": "user", "content": prompt},
        ],
        model="gpt-3.5-turbo",
    )
    return response.choices[0].message.content
