import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useLocation } from "react-router-dom";
import ExamRenderer from "../../components/ExamRenderer";
import { Exam } from "../../types";

export default function Results() {
  const location = useLocation();
  const [exam, setExam] = useState<Exam>();

  useEffect(() => {
    const receivedExamData = location.state?.data;

    if (receivedExamData) {
      setExam(receivedExamData);
    }
  }, [location.state]);

  return (
    <div className="h-full w-full">
      <Navbar />
      <section className="pt-24 flex flex-col items-center justify-center lg:px-48 md:px-12 px-4 bg-secondary">
        <h2 className="secondaryTitle bg-underline3 bg-100%">Prova gerada</h2>
        <div className="p-4">{exam && <ExamRenderer {...exam} />}</div>
      </section>
      <Footer />
    </div>
  );
}
