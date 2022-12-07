export function isEqual(x: any, y: any): boolean {
  if (
    x &&
    y &&
    typeof x === 'object' &&
    typeof x === typeof y &&
    x.constructor === y.constructor
  ) {
    return (
      Object.keys(x).length === Object.keys(y).length &&
      Object.keys(x).every(key => isEqual(x[key], y[key]))
    );
  }
  return x === y;
}
