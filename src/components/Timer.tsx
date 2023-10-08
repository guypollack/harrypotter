import { parseRemainingSeconds } from "../lib/helpers/parseRemainingSeconds";

export function Timer(props: { remainingSeconds: number }) {
  return <h1>{parseRemainingSeconds(props.remainingSeconds)}</h1>;
}
