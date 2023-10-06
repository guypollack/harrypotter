export function calculateRoundScore(name: string, incorrectGuesses: string[]) {
  const uniqueLetters = Array.from(name).filter(
    (letter, index, self) => letter !== " " && self.indexOf(letter) === index
  );

  const deductionValue = 100 / (26 - uniqueLetters.length);

  return Math.round(100 - deductionValue * incorrectGuesses.length);
}

export function Scoreboard(props: { score: number }) {
  return <h1>Score: {props.score}</h1>;
}
