/*
Given a string num that contains only digits and an integer target, return all possibilities to add the binary operators '+', '-', or '*' between the digits of num so that the resultant expression evaluates to the target value.



Example 1:

Input: num = "123", target = 6
Output: ["1*2*3","1+2+3"]
Example 2:

Input: num = "232", target = 8
Output: ["2*3+2","2+3*2"]
Example 3:

Input: num = "105", target = 5
Output: ["1*0+5","10-5"]
Example 4:

Input: num = "00", target = 0
Output: ["0*0","0+0","0-0"]
Example 5:

Input: num = "3456237490", target = 9191
Output: []


Constraints:

1 <= num.length <= 10
num consists of only digits.
-231 <= target <= 231 - 1
*/

function addOperators(num, target) {
  const result = [];
  for (let i = 0, value = 0, op = []; i < num.length; ++i) {
    value = value * 10 + (num[i] - '0');
    op.push(num[i]);
    const ops = op.join('');
    if (ops !== value.toString()) {
      break;
    }
    dfs(num, target, i + 1, 0, value, [ops], result);
  }
  return result;
}

function dfs(num, target, left, op1, op2, path, result) {
  if (left == num.length && op1 + op2 === target) {
    result.push(path.join(''));
    return;
  }

  for (let i = left, value = 0, op = []; i < num.length; ++i) {
    value = value * 10 + (num[i] - '0');
    op.push(num[i]);
    const ops = op.join('');
    if (ops !== value.toString()) {
      break;
    }
    path.push('+' + ops);
    dfs(num, target, i + 1, op1 + op2, value, path, result);
    path.pop();

    path.push('-' + ops);
    dfs(num, target, i + 1, op1 + op2, -value, path, result);
    path.pop();

    path.push('*' + ops);
    dfs(num, target, i + 1, op1, op2 * value, path, result);
    path.pop();
  }
}
