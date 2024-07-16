import { useRef } from "react";
import Highlight1 from "../../assets/Highlight1.svg";
import Highlight2 from "../../assets/Highlight2.svg";
import Teacher from "../../assets/teacher.png";
import CreateExam from "../../components/CreateExam";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Home() {
  const createExamRef = useRef<HTMLDivElement>(null);

  const scrollToCreateExam = () => {
    if (createExamRef.current) {
      createExamRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="h-full w-full">
      <Navbar />
      <section className="pt-24 md:mt-0 md:h-screen flex flex-col justify-center text-center md:text-left md:flex-row md:justify-between md:items-center lg:px-48 md:px-12 px-4 bg-secondary">
        <div className="md:flex-1 md:mr-10">
          <h1 className="font-pt-serif text-5xl font-bold mb-7">
            <span className="bg-underline1 bg-left-bottom bg-no-repeat pb-2 bg-100%">
              ProvAÍ,
            </span>{" "}
            o melhor amigo do professor!
          </h1>
          <p className="font-pt-serif font-normal mb-7">
            Crie provas de forma rápida e fácil com a ajuda da nossa ferramenta
            de inteligência artificial generativa. Ajudamos você, professor, a
            criar provas de qualidade em poucos minutos.
          </p>
          <div className="font-montserrat">
            <button
              className="bg-black px-6 py-4 rounded-lg border-2 border-black border-solid text-white mr-2 mb-2"
              onClick={scrollToCreateExam}
            >
              Crie uma prova já
            </button>
          </div>
        </div>
        <div className="flex justify-around md:block mt-8 md:mt-0 md:flex-1">
          <div className="relative">
            <img src={Highlight1} className="absolute -top-16 -left-10" />
          </div>
          <img src={Teacher} alt="Teacher" />
          <div className="relative">
            <img src={Highlight2} className="absolute -bottom-10 -right-6" />
          </div>
        </div>
      </section>
      <div ref={createExamRef}>
        <CreateExam />
      </div>
      <Footer />
    </div>
  );
}
