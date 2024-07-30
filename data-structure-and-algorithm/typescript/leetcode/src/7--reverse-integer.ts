/*
7. Reverse Integer

Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.

Assume the environment does not allow you to store 64-bit integers (signed or unsigned).

 

Example 1:

Input: x = 123
Output: 321
Example 2:

Input: x = -123
Output: -321
Example 3:

Input: x = 120
Output: 21
 

Constraints:

-231 <= x <= 231 - 1
*/

function reverse(x: number): number {
  const max = Math.pow(2, 31) - 1;
  const min = -Math.pow(2, 31);

  let rslt = 0;
  for (; x; x = Math.trunc(x / 10)) {
    if (
      rslt > Math.trunc(max / 10) ||
      (rslt === Math.trunc(max / 10) && x % 10 > max % 10) ||
      rslt < Math.trunc(min / 10) ||
      (rslt === Math.trunc(min / 10) && x % 10 < min % 10)
    ) {
      return 0;
    }
    rslt = rslt * 10 + (x % 10);
  }

  return rslt;
}
