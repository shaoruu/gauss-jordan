'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var Field = /** @class */ (function () {
    function Field() {
    }
    Field.prototype.subtract = function (x, y) {
        return this.add(x, this.negate(y));
    };
    Field.prototype.divide = function (x, y) {
        return this.multiply(x, this.reciprocal(y));
    };
    return Field;
}());

var RationalField = /** @class */ (function (_super) {
    __extends(RationalField, _super);
    function RationalField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.zero = function () { return 0; };
        _this.one = function () { return 1; };
        _this.equals = function (x, y) { return x === y; };
        _this.negate = function (x) { return -x; };
        _this.add = function (x, y) { return x + y; };
        _this.reciprocal = function (x) { return 1 / x; };
        _this.multiply = function (x, y) { return x * y; };
        return _this;
    }
    RationalField.FIELD = new RationalField();
    return RationalField;
}(Field));

var Matrix = /** @class */ (function () {
    function Matrix(rows, cols, field) {
        var _this = this;
        this.rowCount = function () { return _this.values.length; };
        this.columnCount = function () { return _this.values[0].length; };
        this.get = function (row, col) {
            if (!(0 <= row && row < _this.values.length && 0 <= col && col < _this.values[row].length))
                throw new Error('Row or column index out of bounds');
            return _this.values[row][col];
        };
        this.set = function (row, col, val) {
            if (!(0 <= row && row < _this.values.length && 0 <= col && col < _this.values[row].length))
                throw new Error('Row or column index out of bounds');
            _this.values[row][col] = val;
        };
        this.swapRows = function (row0, row1) {
            if (!(0 <= row0 && row0 < _this.values.length && 0 <= row1 && row1 < _this.values.length))
                throw new Error('Row index out of bounds');
            var temp = _this.values[row0];
            _this.values[row0] = _this.values[row1];
            _this.values[row1] = temp;
        };
        this.multiplyRow = function (row, factor) {
            if (!(0 <= row && row < _this.values.length))
                throw new Error('Row index out of bounds');
            _this.values[row] = _this.values[row].map(function (n) { return _this.f.multiply(n, factor); });
        };
        this.addRows = function (srcRow, destRow, factor) {
            if (!(0 <= srcRow && srcRow < _this.values.length && 0 <= destRow && destRow < _this.values.length))
                throw new Error('Row index out of bounds');
            _this.values[destRow] = _this.values[destRow].map(function (n, i) {
                var srcNum = _this.values[srcRow][i];
                return _this.f.add(n, _this.f.multiply(srcNum, factor));
            });
        };
        this.multiply = function (other) {
            var rows = _this.rowCount();
            var cols = other.columnCount();
            var cells = _this.columnCount();
            var result = new Matrix(rows, cols, _this.f);
            for (var i = 0; i < rows; i++) {
                for (var j = 0; j < cols; j++) {
                    var sum = _this.f.zero();
                    for (var k = 0; k < cells; k++)
                        sum = _this.f.add(_this.f.multiply(_this.get(i, k), other.get(k, j)), sum);
                    result.set(i, j, sum);
                }
            }
            return result;
        };
        // ADVANCED MATRIX OPERATIONS
        this.reducedRowEchelonForm = function () {
            /*
            Converts this matrix to reduced row echelon form (RREF) using Gauss-Jordan elimination.
                All elements of this matrix should be non-None when performing this operation.
                Always succeeds, as long as the field follows the mathematical rules and does not raise an exception.
                The time complexity of this operation is O(rows * cols * min(rows, cols)).
            */
            var rows = _this.rowCount();
            var cols = _this.columnCount();
            // Compute row echelon form (REF)
            var numPivots = 0;
            for (var j = 0; j < cols; j++) {
                if (numPivots >= rows)
                    break;
                var pivotRow = numPivots;
                while (pivotRow < rows && _this.f.equals(_this.get(pivotRow, j), _this.f.zero())) {
                    pivotRow++;
                }
                if (pivotRow === rows)
                    continue; // Cannot eliminate on this column
                _this.swapRows(numPivots, pivotRow);
                pivotRow = numPivots;
                numPivots += 1;
                // Simplify the pivot row
                _this.multiplyRow(pivotRow, _this.f.reciprocal(_this.get(pivotRow, j)));
                // Eliminate rows below
                for (var i = pivotRow + 1; i < rows; i++) {
                    _this.addRows(pivotRow, i, _this.f.negate(_this.get(i, j)));
                }
            }
            // Compute reduced row echelon form (RREF)
            for (var i = numPivots - 1; i >= 0; i--) {
                // Find pivot
                var pivotCol = 0;
                while (pivotCol < cols && _this.f.equals(_this.get(i, pivotCol), _this.f.zero())) {
                    pivotCol++;
                }
                if (pivotCol === cols)
                    continue; // Skip this all-zero row
                // Eliminate rows above
                for (var j = 0; j < i; j++) {
                    _this.addRows(i, j, _this.f.negate(_this.get(j, pivotCol)));
                }
            }
            return _this.values;
        };
        if (rows <= 0 || cols <= 0)
            throw new Error('Invalid number of rows or columns');
        this.f = field;
        this.values = [];
        for (var i = 0; i < rows; i++) {
            this.values.push(new Array(cols));
        }
    }
    Matrix.fromRationalArray = function (array) {
        var f = new RationalField();
        var m = new Matrix(array.length, array[0].length, f);
        for (var i = 0; i < array.length; i++)
            for (var j = 0; j < array[i].length; j++) {
                m.set(i, j, array[i][j]);
            }
        return m;
    };
    return Matrix;
}());

var mod = function (a, b) { return ((a % b) + b) % b; };
var Utils = { mod: mod };

var PrimeField = /** @class */ (function (_super) {
    __extends(PrimeField, _super);
    function PrimeField(mod) {
        var _this = _super.call(this) || this;
        _this.zero = function () { return 0; };
        _this.one = function () { return 1; };
        _this.equals = function (x, y) { return _this._check(x) === _this._check(y); };
        _this.negate = function (x) { return Utils.mod(-_this._check(x), _this.modulus); };
        _this.add = function (x, y) { return Utils.mod(_this._check(x) + _this._check(y), _this.modulus); };
        _this.multiply = function (x, y) { return Utils.mod(_this._check(x) * _this._check(y), _this.modulus); };
        _this.reciprocal = function (w) {
            // Extended Euclidean GCD algorithm
            var x = _this.modulus;
            var y = _this._check(w);
            if (y === 0)
                throw new Error('Division by zero');
            var a = 0;
            var b = 1;
            while (y !== 0) {
                var q = Math.floor(x / y);
                var r = Utils.mod(x, y);
                x = y;
                y = r;
                var temp = a;
                a = b;
                b = temp - q * b;
            }
            if (x !== 1)
                throw new Error('Field modulus is not prime');
            return Utils.mod(a, _this.modulus);
        };
        _this._check = function (x) {
            if (x !== Math.floor(x))
                throw new Error('Number not integer: ' + x);
            if (!(0 <= x && x < _this.modulus))
                throw new Error('Not an element of this field: ' + x);
            return x;
        };
        _this.modulus = mod;
        return _this;
    }
    return PrimeField;
}(Field));

exports.Matrix = Matrix;
exports.PrimeField = PrimeField;
exports.RationalField = RationalField;
exports.Utils = Utils;
