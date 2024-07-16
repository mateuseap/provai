import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useLocation } from "react-router-dom";

export default function Results() {
  const location = useLocation();
  const [examData, setExamData] = useState<any>(null);

  useEffect(() => {
    const receivedExamData = location.state?.data;

    if (receivedExamData) {
      setExamData(receivedExamData);
    }
  }, [location.state]);

  return (
    <div className="h-full w-full">
      <Navbar />
      <section className="pt-24 flex flex-col items-center justify-center lg:px-48 md:px-12 px-4 bg-secondary">
        <h2 className="secondaryTitle bg-underline3 bg-100%">Prova gerada</h2>
        <div className="p-4">
          {examData &&
            examData.map((questionData: any, index: any) => (
              <div key={index} className="mb-8">
                <h3 className="text-lg font-semibold mb-2">
                  {questionData.question}
                </h3>
                <ul className="list-disc ml-6">
                  {questionData.options.map((option: any) => (
                    <li key={option}>
                      <span>{option}</span>
                    </li>
                  ))}
                </ul>
                {questionData.correctAnswer && (
                  <p className="mt-2">
                    <strong>Resposta correta: </strong>
                    {questionData.correctAnswer}
                  </p>
                )}
              </div>
            ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
