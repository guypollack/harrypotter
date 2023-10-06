import { useEffect, useState } from "react";
import { Letter } from "../components/Letter";
import { Name } from "../components/Name";
import { SecretWord } from "../components/SecretWord";
import { generateWord } from "../lib/helpers/generateWord";
import { Keyboard } from "../components/Keyboard";
import { allNames } from "../data/allNames";
import { generateNameSequence } from "../lib/helpers/generateNameSequence";

const nameSequence = generateNameSequence(allNames);

export function HomePage() {
  const secretWord = generateWord().toUpperCase();

  const [remainingNames, setRemainingNames] = useState<string[]>(nameSequence);

  const [remainingLetters, setRemainingLetters] = useState<string[]>(
    Array.from(remainingNames[0]).filter(
      (letter, index, self) => letter !== " " && self.indexOf(letter) === index
    )
  );

  function nextName() {
    const nextNameValue = remainingNames[1];
    setRemainingNames((prev) => prev.slice(1));
    setRemainingLetters(
      Array.from(nextNameValue).filter(
        (letter, index, self) =>
          letter !== " " && self.indexOf(letter) === index
      )
    );
    setCorrectGuesses([]);
    setIncorrectGuesses([]);
  }

  useEffect(() => {
    if (remainingLetters.length === 0) {
      nextName();
    }
  }, [remainingLetters]);

  const [correctGuesses, setCorrectGuesses] = useState<string[]>([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState<string[]>([]);

  console.log(remainingLetters);
  console.log(correctGuesses);
  console.log(incorrectGuesses);
  console.log(remainingNames);

  // console.log(generateNameSequence(allNames));

  function handleCorrectGuess(letter: string) {
    alert(letter);
  }

  return (
    <div className="flex flex-col items-center">
      {/* <SecretWord /> */}
      <Name name={remainingNames[0]} correctGuesses={correctGuesses} />
      {/* <div
        className="bg-blue-300 w-20 h-20 flex relative justify-center items-center"
        onClick={() => alert("Clicked")}
      >
        <h1 className="relative text-2xl">A</h1>
      </div> */}
      <Keyboard
        {...{
          remainingLetters,
          setRemainingLetters,
          correctGuesses,
          setCorrectGuesses,
          incorrectGuesses,
          setIncorrectGuesses,
        }}
      />
    </div>
  );
}
