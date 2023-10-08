import { generateWord } from "../lib/generateWord";

export function SecretWord() {
  return <h1 className="text-3xl font-bold underline">{generateWord()}</h1>;
}
