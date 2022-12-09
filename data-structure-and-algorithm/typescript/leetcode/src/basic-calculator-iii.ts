/**
Implement a basic calculator to evaluate a simple expression string.

The expression string may contain open ( and closing parentheses ), the plus + or minus sign -, non-negative integers and empty spaces .

The expression string contains only non-negative integers, +, -, *, / operators , open ( and closing parentheses ) and empty spaces . The integer division should truncate toward zero.

You may assume that the given expression is always valid. All intermediate results will be in the range of [-2147483648, 2147483647].

Some examples:

"1 + 1" = 2
" 6-4 / 2 " = 4
"2*(5+5*2)/3+(6/2+8)" = 21
"(2+6* 3+5- (3*14/7+2)*5)+3"=-12


Note: Do not use the eval built-in library function.
*/

import {runTestCaseList} from './util/test';

// method - dfs
function calculateIII_Dfs(input: string): number {
  let i = 0;
  return calculateDfs(input);

  function calculateDfs(input: string): number {
    if (i === input.length) {
      return 0;
    }
    const sum: number[] = [];
    let op = '+';
    let num = 0;
    for (; i < input.length; ) {
      const char = input[i++];
      if (char >= '0' && char <= '9') {
        num = num * 10 + Number(char);
      }
      if (char === '(') {
        num = calculateDfs(input);
      }
      if (
        i === input.length ||
        ['+', '-', '*', '/', ')'].find(c => c === char)
      ) {
        switch (op) {
          case '+':
            sum.push(num);
            break;
          case '-':
            sum.push(-num);
            break;
          case '*':
            sum.push(sum.pop()! * num);
            break;
          case '/':
            sum.push(Math.trunc(sum.pop()! / num));
            break;
        }
        op = char;
        num = 0;
        if (op === ')') {
          break;
        }
      }
    }
    return sum.reduce((a, b) => a + b, 0);
  }
}

// iterative
function calculateIII_Iterative(input: string): number {
  const [operands, operators]: [number[], string[]] = [[], []];
  let num = 0;
  for (let i = 0; i < input.length; ++i) {
    const char = input[i];
    if (isDigit(char)) {
      num = num * 10 + Number(char);
      if (i === input.length - 1 || !isDigit(input[i + 1])) {
        operands.push(num);
        num = 0;
      }
    } else if (isOp(char)) {
      while (
        operators.length !== 0 &&
        getPrecendence(char) <= getPrecendence(operators[operators.length - 1])
      ) {
        compute(operands, operators);
      }
      operators.push(char);
    } else if (char === '(') {
      operators.push(char);
    } else if (char === ')') {
      while (operators[operators.length - 1] !== '(') {
        compute(operands, operators);
      }
      operators.pop();
    }
  }
  while (operators.length !== 0) {
    compute(operands, operators);
  }
  return operands.pop()!;

  function isDigit(char: string): boolean {
    return char >= '0' && char <= '9';
  }

  function isOp(char: string): boolean {
    return Boolean(['+', '-', '*', '/'].find(c => c === char));
  }

  function getPrecendence(char: string): number {
    switch (char) {
      case '+':
        return 1;
      case '-':
        return 1;
      case '*':
        return 2;
      case '/':
        return 2;
    }
    return 0;
  }

  function compute(operands: number[], operators: string[]): void {
    const x = operands.pop()!;
    const y = operands.pop()!;
    const op = operators.pop();

    switch (op) {
      case '+':
        operands.push(x + y);
        break;
      case '-':
        operands.push(y - x);
        break;
      case '*':
        operands.push(x * y);
        break;
      case '/':
        operands.push(Math.trunc(y / x));
        break;
    }
  }
}

// tests

const testInputListCollection = [
  ['1 + 1'],
  [' 6-4 / 2 '],
  ['2*(5+5*2)/3+(6/2+8)'],
  ['(2+6* 3+5- (3*14/7+2)*5)+3'],
];

const expectedResultList = [2, 4, 21, -12];

runTestCaseList(testInputListCollection, expectedResultList, calculateIII_Dfs);
runTestCaseList(
  testInputListCollection,
  expectedResultList,
  calculateIII_Iterative
);
