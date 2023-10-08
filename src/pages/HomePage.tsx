import { useEffect, useState } from "react";
import { Letter } from "../components/Letter";
import { Name } from "../components/Name";
import { Keyboard } from "../components/Keyboard";
import { allNames } from "../data/allNames";
import { generateNameSequence } from "../lib/generateNameSequence";
import { clickKey } from "../lib/clickKey";
import { Scoreboard, calculateRoundScore } from "../components/Scoreboard";
import { Timer } from "../components/Timer";
import { ScoreAndTimeContainer } from "../components/ScoreAndTimeContainer";

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
  const [score, setScore] = useState<number>(0);
  const [scoreToAdd, setScoreToAdd] = useState<number>(0);
  const [showScoreToAdd, setShowScoreToAdd] = useState<boolean>(false);

  const [remainingSeconds, setRemainingSeconds] = useState<number>(60);

  const [gameOver, setGameOver] = useState<boolean>(false);

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
    const roundScore = calculateRoundScore(remainingNames[0], incorrectGuesses);
    setScoreToAdd(roundScore);
    setShowScoreToAdd(true);
    setTimeout(() => {
      setScore((prev) => prev + roundScore);
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
      setShowScoreToAdd(false);
    }, 1500);
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

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev === 0) {
          clearInterval(timerInterval);
          setGameOver(true);
          return prev;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  const [correctGuesses, setCorrectGuesses] = useState<string[]>([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState<string[]>([]);

  // console.log(remainingLetters);
  // console.log(correctGuesses);
  // console.log(incorrectGuesses);
  // console.log(remainingNames);
  // console.log(modifierKeysDown);

  // console.log(calculateRoundScore("HARRY POTTER", ["B", "C", "D"]));

  // console.log(generateNameSequence(allNames));

  function handleCorrectGuess(letter: string) {
    alert(letter);
  }

  return (
    <div className="flex flex-col items-center">
      <ScoreAndTimeContainer
        score={score}
        scoreToAdd={scoreToAdd}
        showScoreToAdd={showScoreToAdd}
        remainingSeconds={remainingSeconds}
      />
      <Name
        name={remainingNames[0]}
        correctGuesses={correctGuesses}
        gameOver={gameOver}
      />
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
          gameOver,
        }}
      />
    </div>
  );
}
