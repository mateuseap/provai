import type { Sizes } from "../types";

export const parseQuestions = (questionsString: string) => {
  const questionBlocks = questionsString.trim().split("\n\n");

  return questionBlocks.map((block) => {
    let question = "";
    let correctAnswer = "";
    const options: string[] = [];

    const lines = block.split("\n");
    lines.forEach((line) => {
      if (line.match(/^\d/)) {
        question = line.substring(line.indexOf(" ") + 1);
      } else if (line.startsWith("Resposta:")) {
        correctAnswer = line.substring(line.indexOf(":") + 2);
      } else if (line.trim() !== "") {
        options.push(line);
      }
    });

    return {
      question,
      options,
      correctAnswer,
    };
  });
};

export const classNames = (...classes: any[]): string =>
  classes.filter(Boolean).join(" ");

export function chooseIconSize(size: Sizes | string): string {
  switch (size) {
    case "xs":
      return "h-4 w-4";
    case "sm":
      return "h-6 w-6";
    case "md":
      return "h-8 w-8";
    case "lg":
      return "h-10 w-10";
    case "xl":
      return "h-12 w-12";
    case "2xl":
      return "h-16 w-16";
    case "3xl":
      return "h-20 w-20";
    case "4xl":
      return "h-24 w-24";
    case "5xl":
      return "h-28 w-28";
    case "6xl":
      return "h-44 w-44";
    case "7xl":
      return "h-60 w-60";
    case "8xl":
      return "h-72 w-72";
    case "9xl":
      return "h-80 w-80";
    case "10xl":
      return "h-96 w-96";
    default:
      return size;
  }
}
