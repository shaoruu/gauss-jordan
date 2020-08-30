import { PrimeField } from './PrimeField';
export declare class Matrix {
    f: PrimeField;
    values: number[][];
    constructor(rows: number, cols: number, field: PrimeField);
    rowCount: () => number;
    columnCount: () => number;
    get: (row: number, col: number) => number;
    set: (row: number, col: number, val: number) => void;
    swapRows: (row0: number, row1: number) => void;
    multiplyRow: (row: number, factor: number) => void;
    addRows: (srcRow: number, destRow: number, factor: number) => void;
    multiply: (other: Matrix) => Matrix;
    reducedRowEchelonForm: () => number[][];
}
