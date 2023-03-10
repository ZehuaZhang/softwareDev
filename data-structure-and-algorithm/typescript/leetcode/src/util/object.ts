export type Nullable<T> = T | null;

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

export function isBoolean(item: unknown): boolean {
  return typeof item === 'boolean';
}

export function isNumber(item: unknown): boolean {
  return typeof item === 'number';
}

export function isString(item: unknown): boolean {
  return typeof item === 'string';
}

export function isArray(item: unknown): boolean {
  return Array.isArray(item);
}

export function isObject(item: unknown): boolean {
  return typeof item === 'object' && !isArray(item);
}

export function isFunction(item: unknown): boolean {
  return typeof item === 'function';
}

export function isNull(item: unknown): boolean {
  return item === null;
}
