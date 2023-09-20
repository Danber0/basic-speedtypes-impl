import wordList from "./wordList";

const words = [...wordList];

export const generateParagraph = (): string => {
  const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

  return new Array(25)
    .fill("")
    .map((el, i) => getRandomWord())
    .join(" ");
};
