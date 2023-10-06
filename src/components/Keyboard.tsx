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

function handleGuess(
  letter: string,
  setRemainingLetters: React.Dispatch<React.SetStateAction<string[]>>,
  setGuessesList: React.Dispatch<React.SetStateAction<string[]>>
) {
  setRemainingLetters((prev) => prev.filter((value) => value !== letter));
  setGuessesList((prev) => [...prev, letter]);
}

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
        <KeyboardRow
          keys={row}
          remainingLetters={props.remainingLetters}
          setRemainingLetters={props.setRemainingLetters}
          correctGuesses={props.correctGuesses}
          setCorrectGuesses={props.setCorrectGuesses}
          incorrectGuesses={props.incorrectGuesses}
          setIncorrectGuesses={props.setIncorrectGuesses}
          handleGuess={handleGuess}
          key={`KeyboardRow-${index}`}
        />
      ))}
    </div>
  );
}
