/**
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

function calculateI(input: string): number {
  let i = 0;
  return calculateDFS(input);

  function calculateDFS(input: string): number {
    if (i === input.length) {
      return 0;
    }
    const sum = [];
    let op = '+';
    let num = 0;
    for (; i < input.length; ) {
      const char = input[i++];
      if (char >= '0' && char <= '9') {
        num = num * 10 + Number(char);
      }
      if (char === '(') {
        num = calculateDFS(input);
      }
      if (i === input.length || ['+', '-', ')'].find(c => c === char)) {
        switch (op) {
          case '+':
            sum.push(num);
            break;
          case '-':
            sum.push(-num);
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
