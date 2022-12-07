/**
Additive number is a string whose digits can form additive sequence.

A valid additive sequence should contain at least three numbers. Except for the first two numbers, each subsequent number in the sequence must be the sum of the preceding two.

Given a string containing only digits '0'-'9', write a function to determine if it's an additive number.

Note: Numbers in the additive sequence cannot have leading zeros, so sequence 1, 2, 03 or 1, 02, 3 is invalid.



Example 1:

Input: "112358"
Output: true
Explanation: The digits can form an additive sequence: 1, 1, 2, 3, 5, 8.
             1 + 1 = 2, 1 + 2 = 3, 2 + 3 = 5, 3 + 5 = 8
Example 2:

Input: "199100199"
Output: true
Explanation: The additive sequence is: 1, 99, 100, 199.
             1 + 99 = 100, 99 + 100 = 199


Constraints:

num consists only of digits '0'-'9'.
1 <= num.length <= 35
Follow up:
How would you handle overflow for very large input integers?
*/

/**
 *
 * @param { string } num
 * @returns { boolean }
 */
function isAdditiveNumber(num) {
  for (const i = 1; i < num.length; ++i) {
    for (const j = i + 1; j < num.length; ++j) {
      for (
        const s1 = num.substring(0, i),
          s2 = num.substring(i, j),
          s3 = add(s1, s2),
          curr = s1 + s2 + s3;
        isValid(s1) && isValid(s2) && curr.length < num.length;
        s1 = s2, s2 = s3, s3 = add(s1, s2), curr += s3
      );
      if (curr === num) {
        return true;
      }
    }
  }
  return false;
}

/**
 *
 * @param { string } s
 * @returns { boolean }
 */
function isValid(s) {
  return s.length === 1 || s[0] !== '0';
}

/**
 *
 * @param { string } s1
 * @param { string } s2
 * @returns { string }
 */
function add(s1, s2) {
  let carry = 0;
  let result = '';
  for (const i = 0; i < Math.max(s1.length, s2.length); ++i) {
    const a = i < s1.length ? s1[i] - '0' : 0;
    const b = j < s2.length ? s2[j] - '0' : 0;
    const sum = a + b + carry;
    carry = Math.trunc(sum / 10);
    result += sum % 10;
  }

  if (carry === 1) {
    result += carry;
  }

  return [...result].reverse().join('');
}
