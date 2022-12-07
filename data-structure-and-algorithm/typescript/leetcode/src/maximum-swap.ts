/*
You are given an integer num. You can swap two digits at most once to get the maximum valued number.

Return the maximum valued number you can get.



Example 1:

Input: num = 2736
Output: 7236
Explanation: Swap the number 2 and the number 7.
Example 2:

Input: num = 9973
Output: 9973
Explanation: No swap.


Constraints:

0 <= num <= 108
*/

function maximumSwap(num) {
  const s = [...num.toString()];
  let max = s.length - 1;
  let i1 = 0,
    i2 = 0;
  for (let i = s.length - 2; i >= 0; --i) {
    if (s[max] === s[i]) {
      continue;
    } else if (s[max] < s[i]) {
      max = i;
    } else {
      i1 = max;
      i2 = i;
    }
  }

  const swap = s[i2];
  s[i2] = s[i1];
  s[i1] = swap;

  return BigInt(s.join(''));
}
