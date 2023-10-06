export function generateNameSequence(names: string[]) {
  return names.sort(() => 0.5 - Math.random());
}
