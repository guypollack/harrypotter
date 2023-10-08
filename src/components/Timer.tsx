import { parseRemainingSeconds } from "../lib/helpers/parseRemainingSeconds";

export function Timer(props: { remainingSeconds: number }) {
  return <div>{parseRemainingSeconds(props.remainingSeconds)}</div>;
}
