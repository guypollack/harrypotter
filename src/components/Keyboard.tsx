import { Key } from "./Key";
import { KeyboardRow } from "./KeyboardRow";

function handleClick(ev: React.MouseEvent<HTMLElement>, letter: string) {
  console.log(ev.target);
  console.log(letter);
}

function handleCorrectGuess(
  letter: string,
  setRemainingLetters: React.Dispatch<React.SetStateAction<string[]>>,
  setCorrectGuesses: React.Dispatch<React.SetStateAction<string[]>>
) {
  setRemainingLetters((prev) => prev.filter((value) => value !== letter));
  setCorrectGuesses((prev) => [...prev, letter]);
}

function handleIncorrectGuess(
  letter: string,
  setRemainingLetters: React.Dispatch<React.SetStateAction<string[]>>,
  setIncorrectGuesses: React.Dispatch<React.SetStateAction<string[]>>
) {
  setRemainingLetters((prev) => prev.filter((value) => value !== letter));
  setIncorrectGuesses((prev) => [...prev, letter]);
}

interface HandleGuessProps {
  letter: string;
  setRemainingLetters: React.Dispatch<React.SetStateAction<string[]>>;
  setGuessesList: React.Dispatch<React.SetStateAction<string[]>>;
}

function handleGuess(props: HandleGuessProps) {
  props.setRemainingLetters((prev) =>
    prev.filter((value) => value !== props.letter)
  );
  props.setGuessesList((prev) => [...prev, props.letter]);
}

const determineBackgroundColor = (
  key: string,
  correctGuesses: string[],
  incorrectGuesses: string[]
) =>
  correctGuesses.includes(key)
    ? "bg-green-300"
    : incorrectGuesses.includes(key)
    ? "bg-red-300"
    : "bg-white";

const determineClickHandler = (
  key: string,
  correctGuesses: string[],
  setCorrectGuesses: React.Dispatch<React.SetStateAction<string[]>>,
  incorrectGuesses: string[],
  setIncorrectGuesses: React.Dispatch<React.SetStateAction<string[]>>,
  remainingLetters: string[],
  setRemainingLetters: React.Dispatch<React.SetStateAction<string[]>>,
  handleGuess: (props: HandleGuessProps) => void
) =>
  correctGuesses.includes(key) || incorrectGuesses.includes(key)
    ? () => {}
    : remainingLetters.includes(key)
    ? () =>
        handleGuess({
          letter: key,
          setRemainingLetters,
          setGuessesList: setCorrectGuesses,
        })
    : () =>
        handleGuess({
          letter: key,
          setRemainingLetters,
          setGuessesList: setIncorrectGuesses,
        });

export function Keyboard(props: {
  remainingLetters: string[];
  setRemainingLetters: React.Dispatch<React.SetStateAction<string[]>>;
  correctGuesses: string[];
  setCorrectGuesses: React.Dispatch<React.SetStateAction<string[]>>;
  incorrectGuesses: string[];
  setIncorrectGuesses: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const keys = ["A", "B", "C"];
  const keyboardRowLetters = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ];

  return (
    <div className="flex flex-col items-center relative">
      {keyboardRowLetters.map((row, index) => (
        <div className="flex">
          {row.map((letter) => (
            <Key
              letter={letter}
              onClick={determineClickHandler(
                letter,
                props.correctGuesses,
                props.setCorrectGuesses,
                props.incorrectGuesses,
                props.setIncorrectGuesses,
                props.remainingLetters,
                props.setRemainingLetters,
                handleGuess
              )}
              backgroundColor={determineBackgroundColor(
                letter,
                props.correctGuesses,
                props.incorrectGuesses
              )}
              key={`key-${index}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
