import { useEffect, useState } from "react";
import { Letter } from "../components/Letter";
import { Name } from "../components/Name";
import { Keyboard } from "../components/Keyboard";
import { allNames } from "../data/allNames";
import {
  generateNameSequence,
  generateNameSequence2,
} from "../lib/generateNameSequence";
import { clickKey } from "../lib/clickKey";
import { Scoreboard, calculateRoundScore } from "../components/Scoreboard";
import { Timer } from "../components/Timer";
import { ScoreAndTimeContainer } from "../components/ScoreAndTimeContainer";
import { GrowingBoxesContainer } from "../components/GrowingBoxesContainer";
import { MouseTrail } from "@stichiboi/react-elegant-mouse-trail";

const nameSequence = generateNameSequence2();

const MODIFIER_KEYS = [
  "MetaLeft",
  "AltLeft",
  "ControlLeft",
  "MetaRight",
  "AltRight",
  "ControlRight",
];

const TIME_LIMIT = 300;

export function HomePage() {
  const [score, setScore] = useState<number>(0);
  const [scoreToAdd, setScoreToAdd] = useState<number>(0);
  const [showScoreToAdd, setShowScoreToAdd] = useState<boolean>(false);

  const [remainingSeconds, setRemainingSeconds] = useState<number>(TIME_LIMIT);

  const [gameOver, setGameOver] = useState<boolean>(false);

  const [modifierKeysDown, setModifierKeysDown] = useState<string[]>([]);

  const [remainingNames, setRemainingNames] =
    useState<[string, string][]>(nameSequence);

  const [remainingLetters, setRemainingLetters] = useState<string[]>(
    Array.from(remainingNames[0][1]).filter(
      (letter, index, self) => letter !== " " && self.indexOf(letter) === index
    )
  );

  function handleKeyDown(ev: KeyboardEvent) {
    if (
      MODIFIER_KEYS.includes(ev.code) &&
      !modifierKeysDown.includes(ev.code)
    ) {
      setModifierKeysDown((prev) => [...prev, ev.code]);
    } else if (modifierKeysDown.length === 0) {
      clickKey(ev.code);
    }
  }

  function handleKeyUp(ev: KeyboardEvent) {
    if (MODIFIER_KEYS.includes(ev.code)) {
      setModifierKeysDown((prev) => prev.filter((key) => key !== ev.code));
    }
  }

  function nextName() {
    const roundScore = calculateRoundScore(
      remainingNames[0][1],
      incorrectGuesses
    );
    setScoreToAdd(roundScore);
    setShowScoreToAdd(true);
    setTimeout(() => {
      setScore((prev) => prev + roundScore);
      const nextNameValue = remainingNames[1][1];
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

  function startTimer() {
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
  }

  useEffect(() => {
    startTimer();
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

  function newGame() {
    setScore(0);
    setScoreToAdd(0);
    setShowScoreToAdd(false);
    setRemainingSeconds(TIME_LIMIT);
    startTimer();
    setGameOver(false);
    setRemainingNames(() => {
      const nameSequence = generateNameSequence2();
      setRemainingLetters(
        Array.from(nameSequence[0][1]).filter(
          (letter, index, self) =>
            letter !== " " && self.indexOf(letter) === index
        )
      );
      return nameSequence;
    });
    setCorrectGuesses([]);
    setIncorrectGuesses([]);
  }

  return (
    <div className="h-screen flex flex-col items-center gap-y-10">
      <h1 className="font-potter mt-8 text-3xl">
        Afik's Harry Potter Spell-ing Game!
      </h1>
      <ScoreAndTimeContainer
        score={score}
        scoreToAdd={scoreToAdd}
        showScoreToAdd={showScoreToAdd}
        remainingSeconds={remainingSeconds}
        onNewGame={newGame}
        gameOver={gameOver}
      />
      <Name
        name={remainingNames[0][1]}
        category={remainingNames[0][0]}
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
          showScoreToAdd,
        }}
      />
      {/* <GrowingBoxesContainer /> */}
      <MouseTrail
        strokeColor={"#FF8541"}
        lineWidthStart={10}
        lineDuration={5}
        lag={0.5}
      />
    </div>
  );
}
