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

  for (let [i2, i3, i5] = [0, 0, 0]; rslt.length < n; ) {
    const [v2, v3, v5] = [2 * rslt[i2], 3 * rslt[i3], 5 * rslt[i5]];
    const min = Math.min(v2, v3, v5);
    rslt.push(min);

    if (v2 === min) {
      ++i2;
    }
    if (v3 === min) {
      ++i3;
    }
    if (v5 === min) {
      ++i5;
    }
  }

  return rslt[n - 1];
}
