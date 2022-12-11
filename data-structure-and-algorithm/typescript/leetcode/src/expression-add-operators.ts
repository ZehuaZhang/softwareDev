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

function addOperators(num: string, target: number): string[] {
  const result: string[] = [];
  for (let i = 0, value = 0, digitList: string[] = []; i < num.length; ++i) {
    value = value * 10 + Number(num[i]);
    digitList.push(num[i]);
    const operand = digitList.join('');
    if (operand !== value.toString()) {
      break;
    }
    addOperatorsDfs(i + 1, 0, value, [operand]);
  }
  return result;

  function addOperatorsDfs(
    start: number,
    operand1: number,
    operand2: number,
    path: string[]
  ): void {
    if (start === num.length && operand1 + operand2 === target) {
      result.push(path.join(''));
      return;
    }

    for (
      let i = start, value = 0, digitList: string[] = [];
      i < num.length;
      ++i
    ) {
      value = value * 10 + Number(num[i]);
      digitList.push(num[i]);
      const operand = digitList.join('');
      if (operand !== value.toString()) {
        break;
      }
      path.push('+' + operand);
      addOperatorsDfs(i + 1, operand1 + operand2, value, path);
      path.pop();

      path.push('-' + operand);
      addOperatorsDfs(i + 1, operand1 + operand2, -value, path);
      path.pop();

      path.push('*' + operand);
      addOperatorsDfs(i + 1, operand1, operand2 * value, path);
      path.pop();
    }
  }
}
