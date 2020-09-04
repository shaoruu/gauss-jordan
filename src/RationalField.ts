import { Field } from './Field';

export class RationalField extends Field<number> {
  static FIELD = new RationalField();

  zero = () => 0;

  one = () => 1;

  equals = (x: number, y: number) => x === y;

  negate = (x: number) => -x;

  add = (x: number, y: number) => x + y;

  reciprocal = (x: number) => 1 / x;

  multiply = (x: number, y: number) => x * y;
}
