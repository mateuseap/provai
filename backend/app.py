# from flask import Flask
# from flask_cors import CORS

# app = Flask(__name__)
# cors = CORS(app)


# @app.route("/")
# def hello_world():
#     return "Hello, World!"


# if __name__ == "__main__":
#     app.run(debug=True)


from flask import Flask, render_template, request
import openai

app = Flask(__name__)
history = []

@app.route("/", methods=['GET', 'POST'])
def home():
    answer = ""
    submitted_text = None

    if request.method == 'POST':
        # submitted_text = #TODO Verify how do we get the text from our front end
        submitted_text = request.form['textbox']
        # answer =  TODO get the answer from the get_response function
        # answer = get_response(submitted_text)
        answer= "sim"
        history.append((submitted_text, answer))

    return render_template("home.html", message=history)

@app.route("/app", methods=['GET', 'POST'])
def app_response():
    answer = ""
    submitted_text = request.args.get('text')
    
    if request.method == 'POST' or request.method == 'GET':
        #TODO Modify the get response to act as we planned 
        # answer = get_response(submitted_text)
        answer = "simulated response"
        history.append((submitted_text, answer))

    # return render_template("home.html", message=history)
    return answer

#TODO: Implement the get_response function


# def get_response(question):
#   response = openai.ChatCompletion.create(
#     model="gpt-3.5-turbo",
#     messages=[
#       {
#         "role": "system",
#         "content": "you are a mathematic teacher for kids. You should explain in a way to make a kid understand your answer."
#       },
#       {
#         "role": "user",
#         "content": "How do we calculate a modulo? and what is the modulo?"
#       },
#       {
#         "role": "assistant",
#         "content": "Ah, I see you're curious about modulos! Well, think of a modulo as a way to find the remainder after dividing two numbers. Let me explain it in a fun way.\n\nImagine you have a box of 12 chocolates and you want to share them equally among you and your two best friends. You start dividing the chocolates, giving each friend 4 chocolates. But what about the remaining chocolates? That's where the modulo comes in!\n\nTo calculate the modulo, you count how many chocolates are left after everyone gets their fair share. In this case, when you divide 12 chocolates among 3 people, each person gets 4 chocolates and there are no leftover chocolates. So, the modulo is 0.\n\nNow, let's try a different example. Suppose you have 10 candies and you want to share them equally among 4 friends. You start dividing, giving each friend 2 candies. But there will be some leftovers this time, right?\n\nTo find the modulo, we count how many candies are left after dividing equally. In this case, after giving each friend 2 candies, you'll have 2 candies left over. So, the modulo is 2.\n\nYou can find the modulo for any division calculation by finding the remainder, or what's"
#       },
#       {
#         "role": "user",
#         "content": question
#       }
#     ],
#     temperature=1,
#     max_tokens=256,
#     top_p=1,
#     frequency_penalty=0,
#     presence_penalty=0
#   )

#   processed = response["choices"][0]["message"]["content"]
#   return processed

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)