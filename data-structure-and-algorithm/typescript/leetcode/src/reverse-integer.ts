// 7. Reverse Integer
// Easy

// Given a 32-bit signed integer, reverse digits of an integer.

// Example 1:

// Input: 123
// Output: 321
// Example 2:

// Input: -123
// Output: -321
// Example 3:

// Input: 120
// Output: 21
// Note:
// Assume we are dealing with an environment which could only store integers within the 32-bit signed integer range: [−231,  231 − 1]. For the purpose of this problem, assume that your function returns 0 when the reversed integer overflows.

function reverseNumber(num: number): number {
  const max = Math.pow(2, 31) - 1;
  const min = -1 * Math.pow(2, 31);
  let result = 0;
  for (; num; num = Math.trunc(num / 10)) {
    if (
      result > Math.trunc(max / 10) ||
      (result === Math.trunc(max / 10) && num % 10 > max % 10) ||
      result < Math.trunc(min / 10) ||
      (result === Math.trunc(min / 10) && num % 10 < min % 10)
    ) {
      return 0;
    }
    result = result * 10 + (num % 10);
  }
  return result;
}
