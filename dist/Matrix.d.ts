import { Field } from './Field';
export declare class Matrix<T> {
    f: Field<T>;
    values: T[][];
    constructor(rows: number, cols: number, field: Field<T>);
    static fromRationalArray(array: number[][]): Matrix<number>;
    rowCount: () => number;
    columnCount: () => number;
    get: (row: number, col: number) => T;
    set: (row: number, col: number, val: T) => void;
    swapRows: (row0: number, row1: number) => void;
    multiplyRow: (row: number, factor: T) => void;
    addRows: (srcRow: number, destRow: number, factor: T) => void;
    multiply: (other: Matrix<T>) => Matrix<T>;
    reducedRowEchelonForm: () => T[][];
}
