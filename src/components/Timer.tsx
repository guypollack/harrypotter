import { parseRemainingSeconds } from "../lib/helpers/parseRemainingSeconds";

export function Timer(props: {
  remainingSeconds: number;
  gameOver: boolean;
  onNewGame: () => void;
}) {
  return (
    <div className="flex mb-5">
      <div
        className={`flex items-center mr-2 text-xl bg-gray-100 border rounded ${
          props.gameOver ? "" : "hidden"
        }`}
        onClick={() => props.onNewGame()}
      >
        New Game
      </div>
      {parseRemainingSeconds(props.remainingSeconds)}
    </div>
  );
}
