import { useEffect, useState } from "react";
import { Letter } from "../components/Letter";
import { Name } from "../components/Name";
import { SecretWord } from "../components/SecretWord";
import { generateWord } from "../lib/helpers/generateWord";
import { Keyboard } from "../components/Keyboard";

export function HomePage() {
  const secretWord = generateWord().toUpperCase();

  const [remainingLetters, setRemainingLetters] = useState<string[]>(
    Array.from(secretWord).filter(
      (letter, index, self) => letter !== " " && self.indexOf(letter) === index
    )
  );

  const [correctGuesses, setCorrectGuesses] = useState<string[]>([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState<string[]>([]);

  console.log(remainingLetters);
  console.log(correctGuesses);
  console.log(incorrectGuesses);

  function handleCorrectGuess(letter: string) {
    alert(letter);
  }

  return (
    <div className="flex flex-col items-center">
      {/* <SecretWord /> */}
      <Name name="Albus Dumbledore" correctGuesses={correctGuesses} />
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
