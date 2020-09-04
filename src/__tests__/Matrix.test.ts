import { PrimeField } from '../PrimeField';
import { RationalField } from '../RationalField';
import { Matrix } from '../Matrix';

describe('PrimeField', () => {
  it('should rref properly', () => {
    const modulus = 7;

    const input = [
      [3, 1, 4, 1],
      [5, 2, 6, 5],
      [0, 5, 2, 1],
    ];

    const p = new PrimeField(modulus);
    const m = new Matrix<number>(input.length, input[0].length, p);

    for (let i = 0; i < input.length; i++)
      for (let j = 0; j < input[i].length; j++) {
        m.set(i, j, input[i][j]);
      }

    m.reducedRowEchelonForm();

    expect(m.values).toMatchSnapshot();
  });
});

describe('RationalField', () => {
  it('should rref properly', () => {
    const input = [
      [2, 5, 3, 7],
      [1, 0, 1, 1],
      [-4, 2, -9, 6],
    ];

    const r = new RationalField();
    const m = new Matrix<number>(input.length, input[0].length, r);

    for (let i = 0; i < input.length; i++)
      for (let j = 0; j < input[i].length; j++) {
        m.set(i, j, input[i][j]);
      }

    m.reducedRowEchelonForm();

    expect(m.values).toMatchSnapshot();
  });

  it('should invert properly', () => {
    const input = [
      [1, 3, 5, 9],
      [1, 3, 1, 7],
      [4, 3, 9, 7],
      [5, 2, 0, 9],
    ];

    const r = new RationalField();
    const m = new Matrix<number>(input.length, input[0].length, r);

    for (let i = 0; i < input.length; i++)
      for (let j = 0; j < input[i].length; j++) {
        m.set(i, j, input[i][j]);
      }

    m.invert();

    expect(m.values).toMatchSnapshot();
  });
});
