# ProvAÍ

A generative AI tool designed to assist teachers in creating exams efficiently.

## 🚀 Prerequisites
Before getting started, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) for the frontend.
- [Python](https://www.python.org/) and [virtualenv](https://pypi.org/project/virtualenv/) for the backend.

## 🎨 Frontend

### 🛠️ Setup and Run

Start by creating a ``.env`` file in the frontend folder. Use the example in [``.env.template``](./frontend/.env.template) file as a guide and add your own settings. Once that's done, install the dependencies and launch the React app:

```bash
# Install the dependecies
npm install

# Run the React app
npm run dev
```

You can then access the application locally at http://localhost:5173/. It automatically refreshes whenever you make changes.

## 🔧 Backend

### 🛠️ Setup and Run

To start off, you'll need to create a virtual environment and install the necessary dependencies:

```bash
# Create and activate the virtual environment
python -m venv venv
source venv/bin/activate

# Install the required dependencies
pip install -r requirements.txt
```

Next, run the Flask server locally:

```bash
# Run the Flask server
flask run --debug --port 5000
```

The backend will be accessible locally at http://localhost:5000. The ``--debug`` flag enables automatic reloading whenever changes are made to the backend code.

## 📋 Postmortem report

### 1. How our application works?

  Our application collects data from the user through the frontend. We then apply a layer of prompt engineering on top of this data and make a single call to the OpenAI API to generate the exam using the GPT-4o model. We use **function calling** to organize the output.

### 2. Technologies used

  These are the main technologies we used:
  
  - [React](https://react.dev/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Flask](https://flask.palletsprojects.com/en/3.0.x/)
  - [OpenAI API](https://openai.com/index/openai-api/)
  - [Vercel](https://vercel.com/)
  - [Render](https://render.com/)
  
  We chose these technologies to make development and deployment easier, allowing us to build and deliver the application quickly.

### 3. Project decisions

  We decided to simplify the original plan for the backend. Instead of focusing on both generating and evaluating the exams, we focused only on generating them. This decision helped us ensure the quality of the exams and manage our time better. We found that the results were good enough without the evaluation part, so we concentrated all our efforts on the generation process.
  
  Even though we didn't go further into evaluating the exams (our initial goal was to generate and evaluate them to ensure quality), we did some exploratory research on the evaluation process.

### 4. Major challenges, mistakes, and lessons learned

  **Challenges**
  
  - Deciding what information was needed to generate the exam
  - Prompt engineering
  - Organizing the output from GPT-4o
  
  **Mistakes**
  
  - Poor time management based on our initial goals
  
  **Lessons learned**
  
  - How to do prompt engineering
  - How to use generative AI through an API
  - How to develop applications using generative AI

### 5. Final Project vs. Initial Project

  The big difference was between learning to use existing generative AI tools and creating a new one from scratch.

### 6. Group Work Division

- **Frontend**
  - Brenda Guerra (bvga): Proposed and developed the initial version of our frontend.
  - Camila Vieira (cbv2): Helped define the inputs needed for the frontend.
  - Mateus Elias (meap): Implemented the frontend using React.

- **Backend**
  - Felipe Tabosa (fbt2): Explored the Flask micro-framework and helped define the backend architecture.
  - Mateus Elias (meap): Implemented the backend using Flask and Python and helped define the backend architecture with Felipe and Rafael.
  - Rafael Labio (rrl3): Explored the Flask micro-framework with Felipe and helped define the backend architecture.

- **Integrations**
  - Mateus Elias (meap): Connected the backend with the frontend and set up the calls to the OpenAI API.

- **Prompt Engineering**
  - Camila Vieira (cbv2): Developed the prompt engineering layer based on user input and defined how it was sent to the OpenAI API.
  - José Vinicius (jvss2): Assisted Camila in developing the prompt engineering, checked the reliability of answers (by asking for references), and helped improve the difficulty levels of exams' questions.
  - Mateus Elias (meap): Implemented function calling and improved the prompt engineering related to questions difficulty.
  - Rafael Labio (rrl3): Explored ways to use the OpenAI API, also explored the evaluation part and helped Mateus with function calling.

- **Documentation**
  - Brenda Guerra (bvga), Felipe Tabosa (fbt2), Mateus Elias (meap), and Rafael Labio (rrl3): Created documentation to guide our internal development.

## 👥 Group
- [Brenda Guerra (bvga)](https://github.com/Brenda-Guerra)
- [Camila Vieira (cbv2)](https://github.com/camilab-vieira)
- [Felipe Tabosa (fbt2)](https://github.com/FelipeTbs)
- [José Vinicius (jvss2)](https://github.com/josevinicius1209)
- [Mateus Elias (meap)](https://github.com/mateuseap)
- [Rafael Labio (rrl3)](https://github.com/RafaelRL3)
