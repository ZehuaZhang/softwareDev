import {Data} from './object';

export function createArray(value: Data, ...dimensions: number[]): Array<Data> {
  if (dimensions.length === 1) {
    return Array(dimensions[0]).fill(value);
  }

  return Array.from({length: dimensions[0]}, () =>
    createArray(value, ...dimensions.slice(1))
  );
}
