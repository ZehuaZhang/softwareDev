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

function calculate(s: string): number {
  const n = s.length;
  let rslt = 0;

  for (let i = 0, op = '+', num = 0, sum = 0; i < n; ++i) {
    const c = s[i];
    if (c >= '0' && c <= '9') {
      num = num * 10 + c.charCodeAt(0) - '0'.charCodeAt(0);
    } else if (c === '(') {
      const j = i;
      for (let cnt = 0; i < n; ++i) {
        if (s[i] === '(') {
          ++cnt;
        } else if (s[i] === ')') {
          --cnt;
        }
        if (cnt === 0) {
          break;
        }
      }
      num = calculate(s.substring(j + 1, i));
    }
    if ('+-*/'.includes(c) || i === n - 1) {
      switch (op) {
        case '+': {
          sum += num;
          break;
        }
        case '-': {
          sum -= num;
          break;
        }
        case '*': {
          sum *= num;
          break;
        }
        case '/': {
          sum = Math.trunc(sum / num);
          break;
        }
      }
      if ('+-'.includes(c) || i === n - 1) {
        rslt += sum;
        sum = 0;
      }
      op = c;
      num = 0;
    }
  }
  return rslt;
}

// tests

const testInputListCollection = [
  ['1 + 1'],
  [' 6-4 / 2 '],
  ['2*(5+5*2)/3+(6/2+8)'],
  ['(2+6* 3+5- (3*14/7+2)*5)+3'],
];

const expectedResultList = [2, 4, 21, -12];

runTestCaseList(testInputListCollection, expectedResultList, calculate);
