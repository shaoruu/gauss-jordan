export class PrimeField {
  modulus: number;

  constructor(mod: number) {
    this.modulus = mod;
  }

  zero = () => 0;

  one = () => 1;

  equals = (x: number, y: number) => this._check(x) === this._check(y);

  negate = (x: number) => this._pymod(-this._check(x), this.modulus);

  add = (x: number, y: number) => this._pymod(this._check(x) + this._check(y), this.modulus);

  subtract = (x: number, y: number) => this._pymod(this._check(x) - this._check(y), this.modulus);

  multiply = (x: number, y: number) => this._pymod(this._check(x) * this._check(y), this.modulus);

  reciprocal = (w: number) => {
    // Extended Euclidean GCD algorithm
    let x = this.modulus;
    let y = this._check(w);
    if (y === 0) throw new Error('Division by zero');

    let a = 0;
    let b = 1;

    while (y !== 0) {
      const q = Math.floor(x / y);
      const r = this._pymod(x, y);
      x = y;
      y = r;
      const temp = a;
      a = b;
      b = temp - q * b;
    }

    if (x !== 1) throw new Error('Field modulus is not prime');
    return this._pymod(a, this.modulus);
  };

  _check = (x: number) => {
    if (x !== Math.floor(x)) throw new Error('Number not integer: ' + x);
    if (!(0 <= x && x < this.modulus)) throw new Error('Not an element of this field: ' + x);
    return x;
  };

  _pymod = (a: number, b: number) => ((a % b) + b) % b;
}
