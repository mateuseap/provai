import { Exam } from "../../types";

const ExamRenderer = ({
  subject,
  instructions,
  questions,
  answers,
  correction_instructions,
  alerts,
}: Exam) => {
  return (
    <div className="p-6 shadow-lg max-w-3xl">
      <h1 className="text-3xl font-bold my-4 text-center">{subject}</h1>
      <h2 className="text-xl font-semibold mt-6 mb-4">
        Instruções para o aluno:
      </h2>
      <div className="ml-2">
        {instructions.map((instruction) => (
          <li className="my-1">{instruction}</li>
        ))}
        {instructions.length === 0 && <li>Nenhuma instrução para o aluno.</li>}
      </div>
      <h2 className="text-xl font-semibold mt-6 mb-4">Questões e respostas:</h2>
      <div className="ml-2">
        {questions.map((question) => {
          return (
            <div className="my-2">
              <h3 className="text-lg font-semibold">
                {question.question_number}. {question.question}
              </h3>
              <ul className="mt-2">
                {question.options?.map((option) => (
                  <li>{option}</li>
                ))}
              </ul>
              <p className="my-4 gap-x-1 flex flex-col">
                <span className="font-semibold">Resposta:</span>
                {
                  answers.find(
                    (answer) =>
                      answer.question_number === question.question_number
                  )?.answer
                }
              </p>
            </div>
          );
        })}
      </div>
      <h2 className="text-xl font-semibold mt-6 mb-4">
        Instruções para correção:
      </h2>
      <div className="ml-2">
        {correction_instructions.map((correction_instruction) => (
          <li className="my-1">{correction_instruction}</li>
        ))}
        {correction_instructions.length === 0 && (
          <li>Nenhuma instrução para correção.</li>
        )}
      </div>
      <h2 className="text-xl font-semibold mt-6 mb-4">Alertas:</h2>
      <div className="ml-2">
        {alerts.map((alert) => (
          <li className="my-1">{alert}</li>
        ))}
        {alerts.length === 0 && <li>Nenhum alerta.</li>}
      </div>
    </div>
  );
};

export default ExamRenderer;
