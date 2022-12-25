export function bitCount(num: number): number {
  return num.toString(2).match(/1/g)!.length;
}
