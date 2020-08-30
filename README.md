# gauss-jordan

## Usage

```typescript
const input = [
  [3, 1, 4, 1],
  [5, 2, 6, 5],
  [0, 5, 2, 1],
];

const p = new PrimeField(modulus);
const m = new Matrix(input.length, input[0].length, p);

for (let i = 0; i < input.length; i++)
  for (let j = 0; j < input[i].length; j++) {
    m.set(i, j, input[i][j]);
  }

console.log(m.reducedRowEchelonForm());

/* expect: 
[
    [1, 0, 0, 4],
    [0, 1, 0, 3],
    [0, 0, 1, 0],
]
*/
```

## Installation

`node.js`

```bash
yarn add gauss-jordan
```

`unpkg`

```html
<script src="https://unpkg.com/gauss-jordan@1.2.2/dist/gauss-jordan.min.js"></script>
```
