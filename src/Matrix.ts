import { PrimeField } from './PrimeField';

export class Matrix {
  f: PrimeField;
  values: number[][];

  constructor(rows: number, cols: number, field: PrimeField) {
    if (rows <= 0 || cols <= 0) throw new Error('Invalid number of rows or columns');

    this.f = field;

    this.values = new Array();
    for (let i = 0; i < rows; i++) {
      this.values.push(new Array(cols));
    }
  }

  rowCount = () => this.values.length;

  columnCount = () => this.values[0].length;

  get = (row: number, col: number) => {
    if (!(0 <= row && row < this.values.length && 0 <= col && col < this.values[row].length))
      throw new Error('Row or column index out of bounds');
    return this.values[row][col];
  };

  set = (row: number, col: number, val: number) => {
    if (!(0 <= row && row < this.values.length && 0 <= col && col < this.values[row].length))
      throw new Error('Row or column index out of bounds');
    this.values[row][col] = val;
  };

  swapRows = (row0: number, row1: number) => {
    if (!(0 <= row0 && row0 < this.values.length && 0 <= row1 && row1 < this.values.length))
      throw new Error('Row index out of bounds');

    const temp = this.values[row0];
    this.values[row0] = this.values[row1];
    this.values[row1] = temp;
  };

  multiplyRow = (row: number, factor: number) => {
    if (!(0 <= row && row < this.values.length)) throw new Error('Row index out of bounds');

    this.values[row] = this.values[row].map((n) => this.f.multiply(n, factor));
  };

  addRows = (srcRow: number, destRow: number, factor: number) => {
    if (!(0 <= srcRow && srcRow < this.values.length && 0 <= destRow && destRow < this.values.length))
      throw new Error('Row index out of bounds');

    this.values[destRow] = this.values[destRow].map((n, i) => {
      const srcNum = this.values[srcRow][i];
      return this.f.add(n, this.f.multiply(srcNum, factor));
    });
  };

  multiply = (other: Matrix) => {
    const rows = this.rowCount();
    const cols = other.columnCount();
    const cells = this.columnCount();
    const result = new Matrix(rows, cols, this.f);

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let sum = this.f.zero();
        for (let k = 0; k < cells; k++) sum = this.f.add(this.f.multiply(this.get(i, k), other.get(k, j)), sum);

        result.set(i, j, sum);
      }
    }

    return result;
  };

  // ADVANCED MATRIX OPERATIONS
  reducedRowEchelonForm = () => {
    /*
    Converts this matrix to reduced row echelon form (RREF) using Gauss-Jordan elimination.
		All elements of this matrix should be non-None when performing this operation.
		Always succeeds, as long as the field follows the mathematical rules and does not raise an exception.
		The time complexity of this operation is O(rows * cols * min(rows, cols)).
    */
    const rows = this.rowCount();
    const cols = this.columnCount();

    // Compute row echelon form (REF)
    let numPivots = 0;
    for (let j = 0; j < cols; j++) {
      if (numPivots >= rows) break;

      let pivotRow = numPivots;
      while (pivotRow < rows && this.f.equals(this.get(pivotRow, j), this.f.zero())) {
        pivotRow++;
      }

      if (pivotRow === rows) continue; // Cannot eliminate on this column

      this.swapRows(numPivots, pivotRow);
      pivotRow = numPivots;
      numPivots += 1;

      // Simplify the pivot row
      this.multiplyRow(pivotRow, this.f.reciprocal(this.get(pivotRow, j)));

      // Eliminate rows below
      for (let i = pivotRow + 1; i < rows; i++) {
        this.addRows(pivotRow, i, this.f.negate(this.get(i, j)));
      }
    }

    // Compute reduced row echelon form (RREF)
    for (let i = numPivots - 1; i >= 0; i--) {
      // Find pivot
      let pivotCol = 0;
      while (pivotCol < cols && this.f.equals(this.get(i, pivotCol), this.f.zero())) {
        pivotCol++;
      }
      if (pivotCol === cols) continue; // Skip this all-zero row

      // Eliminate rows above
      for (let j = 0; j < i; j++) {
        this.addRows(i, j, this.f.negate(this.get(j, pivotCol)));
      }
    }

    return this.values;
  };
}
