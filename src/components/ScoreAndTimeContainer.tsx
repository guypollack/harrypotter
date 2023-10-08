import { Scoreboard } from "./Scoreboard";
import { Timer } from "./Timer";

export function ScoreAndTimeContainer(props: {
  score: number;
  scoreToAdd: number;
  showScoreToAdd: boolean;
  remainingSeconds: number;
}) {
  return (
    <div className="w-6/12 flex justify-between text-3xl">
      <Scoreboard
        score={props.score}
        scoreToAdd={props.scoreToAdd}
        showScoreToAdd={props.showScoreToAdd}
      />
      <Timer remainingSeconds={props.remainingSeconds} />
    </div>
  );
}