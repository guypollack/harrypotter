import { Key } from "./Key";

export function KeyboardRow(props: {
  keys: string[];
  remainingLetters: string[];
  setRemainingLetters: React.Dispatch<React.SetStateAction<string[]>>;
  correctGuesses: string[];
  setCorrectGuesses: React.Dispatch<React.SetStateAction<string[]>>;
  incorrectGuesses: string[];
  setIncorrectGuesses: React.Dispatch<React.SetStateAction<string[]>>;
  handleGuess: (
    letter: string,
    setRemainingLetters: React.Dispatch<React.SetStateAction<string[]>>,
    setGuessesList: React.Dispatch<React.SetStateAction<string[]>>
  ) => void;
}) {
  return (
    <div className="flex">
      {props.keys.map((key, index) => (
        <Key
          letter={key}
          backgroundColor={
            props.correctGuesses.includes(key)
              ? "bg-green-300"
              : props.incorrectGuesses.includes(key)
              ? "bg-red-300"
              : "bg-white"
          }
          key={`key-${index}`}
          onClick={
            props.correctGuesses.includes(key) ||
            props.incorrectGuesses.includes(key)
              ? () => {}
              : props.remainingLetters.includes(key)
              ? () =>
                  props.handleGuess(
                    key,
                    props.setRemainingLetters,
                    props.setCorrectGuesses
                  )
              : () =>
                  props.handleGuess(
                    key,
                    props.setRemainingLetters,
                    props.setIncorrectGuesses
                  )
          }
        />
      ))}
    </div>
  );
}
