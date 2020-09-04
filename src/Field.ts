export abstract class Field<T> {
  abstract zero(): T;

  abstract one(): T;

  abstract equals(x: T, y: T): boolean;

  abstract negate(x: T): T;

  abstract add(x: T, y: T): T;

  subtract(x: T, y: T): T {
    return this.add(x, this.negate(y));
  }

  abstract reciprocal(x: T): T;

  abstract multiply(x: T, y: T): T;

  divide(x: T, y: T): T {
    return this.multiply(x, this.reciprocal(y));
  }
}
