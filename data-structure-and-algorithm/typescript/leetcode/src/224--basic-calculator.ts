/*
224. Basic Calculator

Given a string s representing a valid expression, implement a basic calculator to evaluate it, and return the result of the evaluation.

Note: You are not allowed to use any built-in function which evaluates strings as mathematical expressions, such as eval().



Example 1:

Input: s = "1 + 1"
Output: 2
Example 2:

Input: s = " 2-1 + 2 "
Output: 3
Example 3:

Input: s = "(1+(4+5+2)-3)+(6+8)"
Output: 23
Example 4:

Input: s = "+48 + -48"
Output: 0
Explanation: Numbers can have multiple digits and start with +/-.


Constraints:

1 <= s.length <= 3 * 105
s consists of digits, '+', '-', '(', ')', and ' '.
s represents a valid expression.
Every number and running calculation will fit in a signed 32-bit integer.
*/

function calculate(s: string): number {
  const n = s.length;
  let rslt = 0;
  let num = 0;
  let op = "+";
  let sum = 0;
  for (let i = 0; i < n; ++i) {
    const c = s[i];
    if (c >= "0" && c <= "9") {
      num = num * 10 + Number(c);
    } else if (c === "(") {
      let j = i;
      let cnt = 0;
      for (; i < n; ++i) {
        const cc = s[i];
        if (cc === "(") {
          ++cnt;
        } else if (cc === ")") {
          --cnt;
        }
        if (!cnt) {
          break;
        }
      }
      num = calculate(s.substring(j + 1, i));
    }

    if ("+-*/".includes(c) || i === n - 1) {
      switch (op) {
        case "+": {
          sum = sum + num;
          break;
        }
        case "-": {
          sum = sum - num;
          break;
        }
        case "*": {
          sum = sum * num;
          break;
        }
        case "/": {
          sum = Math.trunc(sum / num);
          break;
        }
      }

      if ("+-".includes(c) || i === n - 1) {
        rslt += sum;
        sum = 0;
      }

      op = c;
      num = 0;
    }
  }

  return rslt;
}
