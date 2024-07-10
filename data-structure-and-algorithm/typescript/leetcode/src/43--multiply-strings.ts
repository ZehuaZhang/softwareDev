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
  const [m, n] = [num1.length, num2.length];
  const rslt: number[] = Array(m + n).fill(0);

  for (let i = m - 1; i >= 0; --i) {
      for (let j = n - 1; j >= 0; --j) {
          const d = Number(num1[i]) * Number(num2[j]);
          const s = d + rslt[i + j + 1];
          rslt[i + j + 1] = s % 10;
          rslt[i + j] += Math.trunc(s / 10);
      }
  }

  let leadZero = true;
  return rslt.filter((d, i) => {
      if (d) {
          leadZero = false;
          return true;
      }
      return !leadZero || i === rslt.length - 1;
  }).join('');
};
