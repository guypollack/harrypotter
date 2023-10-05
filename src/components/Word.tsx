import { Letter } from "./Letter";

export function Word(props: { word: string; correctGuesses: string[] }) {
  const letters = Array.from(props.word);
  return (
    <div className="flex mr-10 mb-5">
      {letters.map((letter, index) => (
        <Letter
          letter={letter}
          key={`letter-${index}`}
          visible={props.correctGuesses.includes(letter)}
        />
      ))}
    </div>
  );
}
