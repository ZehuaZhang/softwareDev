/*
264. Ugly Number II

An ugly number is a positive integer whose prime factors are limited to 2, 3, and 5.

Given an integer n, return the nth ugly number.

 

Example 1:

Input: n = 10
Output: 12
Explanation: [1, 2, 3, 4, 5, 6, 8, 9, 10, 12] is the sequence of the first 10 ugly numbers.
Example 2:

Input: n = 1
Output: 1
Explanation: 1 has no prime factors, therefore all of its prime factors are limited to 2, 3, and 5.
 

Constraints:

1 <= n <= 1690
*/

function nthUglyNumber(n: number): number {
  const rslt: number[] = [1];
  for (let i2 = 0, i3 = 0, i5 = 0; rslt.length < n; ) {
    const [v2, v3, v5] = [rslt[i2] * 2, rslt[i3] * 3, rslt[i5] * 5];
    const min = Math.min(v2, v3, v5);

    if (min === v2) {
      ++i2;
    }
    if (min === v3) {
      ++i3;
    }
    if (min === v5) {
      ++i5;
    }

    rslt.push(min);
  }

  return rslt[n - 1];
}
