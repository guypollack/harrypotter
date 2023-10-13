import { allNames } from "../data/allNames";
import { allSpells } from "../data/allSpells";

export function generateNameSequence(names: string[]) {
  return names.sort(() => 0.5 - Math.random());
}

export function generateNameSequence2(): [string, string][] {
  const namesArray = allNames.map((name) => ["Character", name]);
  const spellsArray = allSpells.map((spell) => ["Spell", spell]);
  return [...namesArray, ...spellsArray].sort(() => Math.random() - 0.5) as [
    string,
    string
  ][];
}
