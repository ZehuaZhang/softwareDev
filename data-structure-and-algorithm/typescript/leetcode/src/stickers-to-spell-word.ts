/*
We are given n different types of stickers. Each sticker has a lowercase English word on it.

You would like to spell out the given string target by cutting individual letters from your collection of stickers and rearranging them. You can use each sticker more than once if you want, and you have infinite quantities of each sticker.

Return the minimum number of stickers that you need to spell out target. If the task is impossible, return -1.

Note: In all test cases, all words were chosen randomly from the 1000 most common US English words, and target was chosen as a concatenation of two random words.



Example 1:

Input: stickers = ["with","example","science"], target = "thehat"
Output: 3
Explanation:
We can use 2 "with" stickers, and 1 "example" sticker.
After cutting and rearrange the letters of those stickers, we can form the target "thehat".
Also, this is the minimum number of stickers necessary to form the target string.
Example 2:

Input: stickers = ["notice","possible"], target = "basicbasic"
Output: -1
Explanation:
We cannot form the target "basicbasic" from cutting letters from the given stickers.


Constraints:

n == stickers.length
1 <= n <= 50
1 <= stickers[i].length <= 10
1 <= target <= 15
stickers[i] and target consist of lowercase English letters.
*/

function stickerToSpellWord(stickers: string[], target: string): number {
  const length = 1 << target.length;
  const result = Array(length).fill(Infinity);
  result[0] = 0;
  for (let i = 0; i < length; ++i) {
    if (result[i] === Infinity) {
      continue;
    }
    for (const sticker of stickers) {
      let mask = i;
      for (const char of sticker) {
        for (let j = 0; j < target.length; j++) {
          if (target[j] === char && !((mask >> j) & 1)) {
            mask |= 1 << j;
            break;
          }
        }
      }
      result[mask] = Math.min(result[mask], result[i] + 1);
    }
  }
  return result[length - 1] === Infinity ? -1 : result[length - 1];
}
