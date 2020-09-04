import { Field } from './Field';
export declare class RationalField extends Field<number> {
    static FIELD: RationalField;
    zero: () => number;
    one: () => number;
    equals: (x: number, y: number) => boolean;
    negate: (x: number) => number;
    add: (x: number, y: number) => number;
    reciprocal: (x: number) => number;
    multiply: (x: number, y: number) => number;
}
