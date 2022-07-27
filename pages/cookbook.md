- [Introduction](#introduction)
  - [How the Recipes and Results Work](#how-the-recipes-and-results-work)
- [Multiple Emphases on Text](#multiple-emphases-on-text)
- [Paragraph with Rich Text](#paragraph-with-rich-text)
- [Table with Object Rows](#table-with-object-rows)
- [Table with Object Rows, Using External Data](#table-with-object-rows-using-external-data)
- [Table with Tuple Rows](#table-with-tuple-rows)

## Introduction

Below are examples and recipes for using **ts-markdown**, where we show a **recipe** and then a **result**. If you would like an example of how to do something in this cookbook, [open a new github issue](https://github.com/kgar/ts-markdown/issues/new) requesting the type of cookbook example you'd like to see here.

### How the Recipes and Results Work

Assume that for each case, we are passing the resulting entry or entries into the `tsMarkdown()` function, as follows:

For single-entry examples, we would wrap it in an array before rendering markdown:

```ts
let entry = { p: 'My paragraph' };

let result = tsMarkdown([entry]);
```

For entry array examples, we would pass it through directly:

```ts
let entries = [{ h1: 'Documentation' }, { p: 'My paragraph' }];

let result = tsMarkdown(entries);
```

[Back to Top](#)

<br />

## Multiple Emphases on Text

Recipe:

```ts
const richText = {
  text: ['Hello, ', { highlight: { bold: { italic: 'world' } } }, '!'],
};
```

Recipe (with helper functions):

```ts
const richText = text(['Hello, ', highlight(bold(italic('world'))), '!']);
```

Result:

```
Hello, ==***world***==!
```

[Back to Top](#)

<br />

## Paragraph with Rich Text

Recipe:

```ts
const paragraph: ParagraphEntry = {
  p: ['Here is some ', { bold: 'rich' }, ' ', { italic: 'text' }, '.'],
};
```

Recipe (with helper functions):

```ts
const paragraph = p(['Here is some ', bold('rich'), ' ', italic('text'), '.']);
```

Result:

```
Here is some **rich** *text*.
```

[Back to Top](#)

<br />

## Table with Object Rows

Recipe:

```ts
const table: TableEntry = {
  table: {
    columns: [{ name: 'Column 1' }, { name: 'Column 2' }],
    rows: [
      {
        'Column 1': 'Column 1 stuff',
        'Column 2': 'Column 2 stuff',
      },
      {
        'Column 1': 'More col1 stuff',
        'Column 2': 'More col2 stuff',
      },
    ],
  },
};
```

Recipe (with helper functions):

```ts
const myTable = table({
  columns: [{ name: 'Column 1' }, { name: 'Column 2' }],
  rows: [
    {
      'Column 1': 'Column 1 stuff',
      'Column 2': 'Column 2 stuff',
    },
    {
      'Column 1': 'More col1 stuff',
      'Column 2': 'More col2 stuff',
    },
  ],
});
```

Result:

```
| Column 1        | Column 2        |
| --------------- | --------------- |
| Column 1 stuff  | Column 2 stuff  |
| More col1 stuff | More col2 stuff |
```

[Back to Top](#)

<br />

## Table with Object Rows, Using External Data

```ts
// Given some external data
const data = [
  {
    firstName: 'Fred',
    lastName: 'Flintstone',
    age: 100000000,
  },
  {
    firstName: 'Saitama',
    lastName: null,
    age: 25,
  },
  {
    firstName: 'Miles',
    lastName: 'Morales',
    age: 17,
  },
];

// Map the data to match your column names
const myRows = data.map((x) => ({
  'First Name': x.firstName,
  'Last Name': x.lastName,
  Age: x.age,
}));

const myTable = {
  table: {
    columns: [{ name: 'First Name' }, { name: 'Last Name' }, { name: 'Age' }],
    rows: myRows,
  },
};
```

Recipe (with helper functions):

```ts
const myTable = table({
  columns: [{ name: 'First Name' }, { name: 'Last Name' }, { name: 'Age' }],
  rows: myRows,
});
```

Result:

```
| First Name | Last Name  | Age       |
| ---------- | ---------- | --------- |
| Fred       | Flintstone | 100000000 |
| Saitama    |            | 25        |
| Miles      | Morales    | 17        |
```

[Back to Top](#)

<br />

## Table with Tuple Rows

Recipe:

```ts
const table: TableEntry = {
  table: {
    columns: [{ name: 'Column 1' }, { name: 'Column 2' }],
    rows: [
      ['Column 1 stuff', 'Column 2 stuff'],
      ['More col1 stuff', 'More col2 stuff'],
    ],
  },
};
```

Recipe (with helper functions):

```ts
const myTable = table({
  columns: [{ name: 'Column 1' }, { name: 'Column 2' }],
  rows: [
    ['Column 1 stuff', 'Column 2 stuff'],
    ['More col1 stuff', 'More col2 stuff'],
  ],
});
```

Result:

```
| Column 1        | Column 2        |
| --------------- | --------------- |
| Column 1 stuff  | Column 2 stuff  |
| More col1 stuff | More col2 stuff |
```

[Back to Top](#)
