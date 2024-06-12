/*
43. Multiply Strings

Given two non-negative integers num1 and num2 represented as strings, return the product of num1 and num2, also represented as a string.

Note: You must not use any built-in BigInteger library or convert the inputs to integer directly.

 

Example 1:

Input: num1 = "2", num2 = "3"
Output: "6"
Example 2:

Input: num1 = "123", num2 = "456"
Output: "56088"
 

Constraints:

1 <= num1.length, num2.length <= 200
num1 and num2 consist of digits only.
Both num1 and num2 do not contain any leading zero, except the number 0 itself.
*/

function multiply(num1: string, num2: string): string {
  const result: number[] = Array(num1.length + num2.length).fill(0);

  for (let i = num1.length - 1; i >= 0; --i) {
    for (let j = num2.length - 1; j >= 0; --j) {
      const [di, ci] = [i + j + 1, i + j];
      const mul = Number(num1[i]) * Number(num2[j]);
      const sum = mul + result[di];
      result[di] = sum % 10;
      result[ci] += Math.trunc(sum / 10);
    }
  }

  let firstZero = true;
  return result
    .filter((d, i) => {
      if (d) {
        firstZero = false;
      }
      return !firstZero || i === result.length - 1;
    })
    .join('');
}
