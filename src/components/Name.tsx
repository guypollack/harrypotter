import { Word } from "./Word";

export function Name(props: {
  name: string;
  category: string;
  correctGuesses: string[];
  gameOver: boolean;
}) {
  const words = props.name.toUpperCase().split(" ");
  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap justify-center">
        {words.map((word, index) => (
          <Word
            word={word}
            correctGuesses={props.correctGuesses}
            key={`word-${index}`}
            gameOver={props.gameOver}
          />
        ))}
      </div>
      <p>{props.category}</p>
    </div>
  );
}
