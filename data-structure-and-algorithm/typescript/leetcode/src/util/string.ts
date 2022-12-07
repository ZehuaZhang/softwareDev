export function getSegmentLine(character = '=', counts = 50): string {
  return character.repeat(counts);
}

export function printSegmentLine(character = '=', counts = 50): void {
  console.log(getSegmentLine(character, counts));
}

export function stringify(object: any): string {
  return JSON.stringify(object);
}
