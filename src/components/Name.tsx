import { Word } from "./Word";

export function Name(props: { name: string; correctGuesses: string[] }) {
  const words = props.name.toUpperCase().split(" ");
  return (
    <div className="flex flex-wrap">
      {words.map((word, index) => (
        <Word
          word={word}
          correctGuesses={props.correctGuesses}
          key={`word-${index}`}
        />
      ))}
    </div>
  );
}
