import { ChangeEvent, useEffect, useRef, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner";
import { Tooltip as ReactTooltip } from "react-tooltip";

export default function CreateExam() {
  const [apiKey, setApiKey] = useState("");
  const [isApiKeyHidden, setIsApiKeyHidden] = useState(true);
  const [numberOfQuestions, setNumberOfQuestions] = useState(1);
  const [questionsType, setQuestionsType] = useState("múltipla escolha");
  const [difficulty, setDifficulty] = useState("médio");
  const [subject, setSubject] = useState("");
  const [primaryInstructions, setPrimaryInstructions] = useState("");
  const [contextRestriction, setContextRestriction] = useState(false);
  const [context, setContext] = useState<string | null>(null);
  const [contextError, setContextError] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleApiKeyVisibility = () => {
    setIsApiKeyHidden(!isApiKeyHidden);
  };

  const {
    data,
    refetch: generateExam,
    isSuccess,
    isFetching,
  } = useQuery<{ message: string; exam: string }>({
    queryKey: [
      "generate-exam",
      "POST",
      {
        data: {
          api_key: apiKey,
          number_of_questions: numberOfQuestions,
          primary_instructions: primaryInstructions
            ? primaryInstructions
            : null,
          questions_type: questionsType,
          subject,
          difficulty,
          context_restriction: contextRestriction,
          context: context ? context : null,
        },
      },
    ],
    retry: false,
    enabled: false,
  });

  const handleGenerateExam = () => {
    if (
      !apiKey ||
      numberOfQuestions < 1 ||
      numberOfQuestions > 10 ||
      (contextRestriction && !context)
    ) {
      return;
    }
    generateExam();
  };

  useEffect(() => {
    if (data && data.exam && isSuccess) {
      navigate("/resultados", {
        state: { data: data.exam },
      });
    }
  }, [data]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;
        setContext(text as string);
        setContextError(false);
        setFileName(file.name);
      };
      reader.onerror = () => {
        setContextError(true);
      };
      reader.readAsText(file);
    } else {
      setContext(null);
      setContextError(true);
      setFileName(null);
    }
  };

  const clearFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      setContext(null);
      setFileName(null);
    }
  };

  return (
    <section
      id="create"
      className="bg-black text-secondary sectionSize p-10 font-montserrat"
    >
      {!isFetching ? (
        <>
          <div className="my-10 text-center">
            <h2 className="text-3xl font-medium mb-2 secondaryTitle">
              Chave da OpenAI
            </h2>
            <div className="flex items-center justify-center mb-6">
              <input
                type={isApiKeyHidden ? "password" : "text"}
                value={apiKey}
                placeholder="Insira sua chave da OpenAI"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setApiKey(e.target.value)
                }
                className="p-3 rounded-lg text-black w-full border-2 border-gray-300"
              />
              <button
                onClick={toggleApiKeyVisibility}
                className="ml-2 p-2 bg-white rounded-lg"
              >
                {isApiKeyHidden ? (
                  <EyeIcon className="h-5 w-5 text-black" />
                ) : (
                  <EyeSlashIcon className="h-5 w-5 text-black" />
                )}
              </button>
            </div>
          </div>
          <div className="mb-10">
            <h2 className="text-3xl font-medium mb-2 secondaryTitle text-center">
              Monte a sua prova
            </h2>
            <div className="flex flex-col">
              <div className="w-full max-w-md mb-4">
                <label
                  htmlFor="numberOfQuestions"
                  className="block mb-2 text-lg"
                >
                  Número de questões
                </label>
                <input
                  type="range"
                  id="numberOfQuestions"
                  value={numberOfQuestions}
                  min="1"
                  max="10"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setNumberOfQuestions(Number(e.target.value))
                  }
                  className="w-full"
                />
                <span className="block text-center mt-2">
                  {numberOfQuestions}
                </span>
              </div>
              <div className="w-full max-w-md mb-4">
                <label
                  htmlFor="primaryInstructions"
                  className="block mb-2 text-lg flex items-center"
                >
                  Instruções principais
                  <InformationCircleIcon
                    className="h-4 w-4 text-white ml-1"
                    data-tooltip-id="primary-instructions"
                    data-tooltip-content="Essas instruções serão as mais priorizadas na hora da geração da sua prova"
                  />
                  <ReactTooltip id="primary-instructions" />
                </label>
                <textarea
                  id="primaryInstructions"
                  value={primaryInstructions}
                  placeholder="Descreva o que você deseja que seja considerado na hora de gerar a prova (ex: será uma prova para alunos do 9º ano, tempo de duração, etc)"
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setPrimaryInstructions(e.target.value)
                  }
                  className="w-full p-3 rounded-lg text-black border-2 border-gray-300 resize-none"
                  rows={4}
                />
              </div>
              <div className="w-full max-w-md mb-4">
                <label htmlFor="questionsType" className="block mb-2 text-lg">
                  Tipo de questões
                </label>
                <select
                  id="questionsType"
                  value={questionsType}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setQuestionsType(e.target.value)
                  }
                  className="w-full p-3 rounded-lg text-black border-2 border-gray-300"
                >
                  <option value="múltipla escolha">Múltipla escolha</option>
                  <option value="dissertativa">Dissertativa</option>
                </select>
              </div>
              <div className="w-full max-w-md mb-4">
                <label htmlFor="subject" className="block mb-2 text-lg">
                  Assunto
                </label>
                <input
                  type="text"
                  id="subject"
                  value={subject}
                  placeholder="Insira qual o assunto da prova"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSubject(e.target.value)
                  }
                  className="w-full p-3 rounded-lg text-black border-2 border-gray-300"
                />
              </div>
              <div className="w-full max-w-md mb-4">
                <label htmlFor="questionsType" className="block mb-2 text-lg">
                  Dificuldade das questões
                </label>
                <select
                  id="difficulty"
                  value={difficulty}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setDifficulty(e.target.value)
                  }
                  className="w-full p-3 rounded-lg text-black border-2 border-gray-300"
                >
                  <option value="fácil">Fácil</option>
                  <option value="médio">Médio</option>
                  <option value="difícil">Difícil</option>
                </select>
              </div>
            </div>
            <div className="mb-10">
              <label
                htmlFor="contextFile"
                className="block mb-2 text-lg text-center flex items-center"
              >
                Contexto (.txt)
                <InformationCircleIcon
                  className="h-4 w-4 text-white ml-1"
                  data-tooltip-id="context-file"
                  data-tooltip-content="O conteúdo desse arquivo .txt será utilizado pela IA como base para a geração da prova"
                />
                <ReactTooltip id="context-file" />
              </label>
              <div className="flex flex-col justify-center items-center gap-y-4">
                <label
                  htmlFor="contextFile"
                  className="w-64 flex items-center justify-center px-4 py-2 bg-secondary text-black rounded-lg cursor-pointer border-2 border-gray-300"
                >
                  <span>Selecionar arquivo</span>
                  <input
                    type="file"
                    id="contextFile"
                    accept=".txt"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className="hidden"
                  />
                </label>
                {fileName && <div className="text-gray-400">{fileName}</div>}
                {contextError && (
                  <span className="text-red-500">
                    Por favor, selecione um arquivo .txt válido
                  </span>
                )}
                {fileName && (
                  <button
                    onClick={clearFileInput}
                    className="px-4 py-2 bg-secondary text-black rounded-lg border-2 border-black border-solid"
                  >
                    Limpar
                  </button>
                )}
              </div>
            </div>
            <div
              className={`flex flex-row w-full items-center ${
                context ? "justify-between gap-x-16" : "justify-center"
              }`}
            >
              {context && (
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={contextRestriction}
                    onChange={() => setContextRestriction(!contextRestriction)}
                    className="mr-2"
                  />
                  <p className="flex gap-x-1 items-center">
                    <h2>Restrição de contexto </h2>
                    <InformationCircleIcon
                      className="h-4 w-4 text-white ml-1"
                      data-tooltip-id="context-restriction"
                      data-tooltip-content="Caso marque essa opção, a IA irá gerar a prova estritamente com base no conteúdo do arquivo de contexto fornecido"
                    />
                    <ReactTooltip id="context-restriction" />
                  </p>
                </div>
              )}
              <button
                className="px-6 py-4 bg-secondary text-black rounded-lg border-2 border-black border-solid"
                onClick={handleGenerateExam}
              >
                Gerar prova
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-96 text-secondary">
          <h2 className="text-3xl font-bold mb-4">Gerando sua prova!</h2>
          <Spinner size="xl" />
        </div>
      )}
    </section>
  );
}
