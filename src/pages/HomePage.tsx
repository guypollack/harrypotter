import { useEffect, useState } from "react";
import { Letter } from "../components/Letter";
import { Name } from "../components/Name";
import { SecretWord } from "../components/SecretWord";
import { generateWord } from "../lib/helpers/generateWord";
import { Keyboard } from "../components/Keyboard";
import { allNames } from "../data/allNames";
import { generateNameSequence } from "../lib/helpers/generateNameSequence";
import { clickKey } from "../lib/helpers/clickKey";

const nameSequence = generateNameSequence(allNames);

const modifierKeys = [
  "MetaLeft",
  "AltLeft",
  "ControlLeft",
  "MetaRight",
  "AltRight",
  "ControlRight",
];

export function HomePage() {
  const secretWord = generateWord().toUpperCase();

  const [modifierKeysDown, setModifierKeysDown] = useState<string[]>([]);

  const [remainingNames, setRemainingNames] = useState<string[]>(nameSequence);

  const [remainingLetters, setRemainingLetters] = useState<string[]>(
    Array.from(remainingNames[0]).filter(
      (letter, index, self) => letter !== " " && self.indexOf(letter) === index
    )
  );

  function handleKeyDown(ev: KeyboardEvent) {
    if (modifierKeys.includes(ev.code) && !modifierKeysDown.includes(ev.code)) {
      setModifierKeysDown((prev) => [...prev, ev.code]);
    } else if (modifierKeysDown.length === 0) {
      clickKey(ev.code);
    }
  }

  function handleKeyUp(ev: KeyboardEvent) {
    if (modifierKeys.includes(ev.code)) {
      setModifierKeysDown((prev) => prev.filter((key) => key !== ev.code));
    }
  }

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

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  });

  const [correctGuesses, setCorrectGuesses] = useState<string[]>([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState<string[]>([]);

  console.log(remainingLetters);
  console.log(correctGuesses);
  console.log(incorrectGuesses);
  console.log(remainingNames);
  console.log(modifierKeysDown);

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
