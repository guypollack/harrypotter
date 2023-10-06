export function calculateRoundScore(name: string, incorrectGuesses: string[]) {
  const uniqueLetters = Array.from(name).filter(
    (letter, index, self) => letter !== " " && self.indexOf(letter) === index
  );

  const deductionValue = 100 / (26 - uniqueLetters.length);

  return Math.round(100 - deductionValue * incorrectGuesses.length);
}

export function Scoreboard(props: {
  score: number;
  scoreToAdd: number;
  showScoreToAdd: boolean;
}) {
  return (
    <h1>
      Score: {props.score}
      <span className="text-green-400">
        {props.showScoreToAdd ? `+${props.scoreToAdd}` : ""}
      </span>
    </h1>
  );
}
