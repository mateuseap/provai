def generate_exam(client, context):
    try:
        response = client.completions.create(
            model="gpt-3.5-turbo-instruct",
            prompt=f"""
            Para criar uma prova de múltipla escolha sobre o seguinte tema:
            
            {context}
            
            Por favor, inclua perguntas variadas que avaliem diferentes aspectos do tema. Utilize uma linguagem clara e objetiva nas questões e certifique-se de que cada pergunta tenha apenas uma resposta correta.

            Pergunta:
            """,
            max_tokens=1024,
            temperature=0.7,
            top_p=1.0,
            stop="\n\nPergunta:",
        )

        questions = response.choices[0].text
        return questions

    except Exception as e:
        raise ValueError(f"Error generating exam: {str(e)}")
