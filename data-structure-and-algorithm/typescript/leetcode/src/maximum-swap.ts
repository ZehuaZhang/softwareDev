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

function maximumSwap(num: number): number {
  const input: string[] = [...num.toString()];
  let swapIndex = input.length - 1;
  let [i1, i2] = [0, 0];
  for (let i = input.length - 2; i >= 0; --i) {
    if (input[swapIndex] === input[i]) {
      continue;
    } else if (input[swapIndex] < input[i]) {
      swapIndex = i;
    } else {
      i1 = swapIndex;
      i2 = i;
    }
  }

  const swap = input[i2];
  input[i2] = input[i1];
  input[i1] = swap;

  return Number(input.join(''));
}
