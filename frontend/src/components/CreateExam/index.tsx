import { useEffect, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { parseQuestions } from "../../utils";
import Spinner from "../Spinner";

export default function CreateExam() {
  const [apiKey, setApiKey] = useState("");
  const [isApiKeyHidden, setIsApiKeyHidden] = useState(true);
  const [context, setContext] = useState("");
  const navigate = useNavigate();

  const toggleApiKeyVisibility = () => {
    setIsApiKeyHidden(!isApiKeyHidden);
  };

  const {
    data,
    refetch: generateExame,
    isSuccess,
    isFetching,
  } = useQuery<{ message: string; questions: string }>({
    queryKey: ["generate-exam", "POST", { data: { api_key: apiKey, context } }],
    retry: false,
    enabled: false,
  });

  const handleGenerateExam = () => {
    if (!apiKey || !context || isFetching) return;
    generateExame();
  };

  useEffect(() => {
    if (data && data.questions && isSuccess) {
      navigate("/resultados", {
        state: { data: parseQuestions(data.questions) },
      });
    }
  }, [data]);

  return (
    <section id="create" className="bg-black text-white sectionSize">
      {!isFetching ? (
        <>
          <div>
            <h2 className="secondaryTitle bg-underline2 bg-100%">
              Chave da OpenAI
            </h2>
            <div className="flex items-center justify-center">
              <input
                type={isApiKeyHidden ? "password" : "text"}
                value={apiKey}
                placeholder="Insira sua chave da OpenAI"
                onChange={(e) => setApiKey(e.target.value)}
                className="p-3 rounded-lg text-black w-2/3 border-2 border-gray-300"
              />
              <button
                onClick={toggleApiKeyVisibility}
                className="ml-2 p-2 bg-gray-200 rounded-lg"
              >
                {isApiKeyHidden ? (
                  <EyeIcon className="h-5 w-5 text-gray-700" />
                ) : (
                  <EyeSlashIcon className="h-5 w-5 text-gray-700" />
                )}
              </button>
            </div>
          </div>
          <div className="mt-14">
            <h2 className="secondaryTitle bg-underline2 bg-100%">
              Tema da prova
            </h2>
            <textarea
              value={context}
              placeholder="Descreva o tema da prova"
              onChange={(e) => setContext(e.target.value)}
              className="w-full h-48 p-4 rounded-lg text-black border-2 border-gray-300"
            />
          </div>
          <button
            className="mt-14 px-6 py-4 border-2 border-white border-solid rounded-lg"
            onClick={handleGenerateExam}
          >
            Gerar prova
          </button>
        </>
      ) : (
        <div className="flex flex-col h-96 items-center justify-center txt-white">
          <h2 className="secondaryTitle bg-underline2 bg-100%">Gerando sua prova!</h2>
          <Spinner size="xl" />
        </div>
      )}
    </section>
  );
}
