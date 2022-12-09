/**
Given a string s which represents an expression, evaluate this expression and return its value.

The integer division should truncate toward zero.

Note: You are not allowed to use any built-in function which evaluates strings as mathematical expressions, such as eval().



Example 1:

Input: s = "3+2*2"
Output: 7
Example 2:

Input: s = " 3/2 "
Output: 1
Example 3:

Input: s = " 3+5 / 2 "
Output: 5


Constraints:

1 <= s.length <= 3 * 105
s consists of integers and operators ('+', '-', '*', '/') separated by some number of spaces.
s represents a valid expression.
All the integers in the expression are non-negative integers in the range [0, 231 - 1].
The answer is guaranteed to fit in a 32-bit integer.
*/

function calculateII(input: string): number {
  const sum: number[] = [];
  let op = '+';
  let num = 0;
  for (let i = 0; i < input.length; ) {
    const char = input[i++];
    if (char >= '0' && char <= '9') {
      num = num * 10 + Number(char);
    }
    if (i === input.length || ['+', '-', '*', '/'].find(c => c === char)) {
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
    }
  }
  return sum.reduce((a, b) => a + b, 0);
}
