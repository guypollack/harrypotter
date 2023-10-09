import { Letter } from "./Letter";

export function Word(props: {
  word: string;
  correctGuesses: string[];
  gameOver: boolean;
}) {
  const letters = Array.from(props.word);
  return (
    <div className="flex mx-5 mb-5">
      {letters.map((letter, index) => (
        <Letter
          letter={letter}
          key={`letter-${index}`}
          visible={props.correctGuesses.includes(letter)}
          gameOver={props.gameOver}
        />
      ))}
    </div>
  );
}
