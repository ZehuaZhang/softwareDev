/*
Given an input string s, reverse the order of the words.

A word is defined as a sequence of non-space characters. The words in s will be separated by at least one space.

Return a string of the words in reverse order concatenated by a single space.

Note that s may contain leading or trailing spaces or multiple spaces between two words. The returned string should only have a single space separating the words. Do not include any extra spaces.



Example 1:

Input: s = "the sky is blue"
Output: "blue is sky the"
Example 2:

Input: s = "  hello world  "
Output: "world hello"
Explanation: Your reversed string should not contain leading or trailing spaces.
Example 3:

Input: s = "a good   example"
Output: "example good a"
Explanation: You need to reduce multiple spaces between two words to a single space in the reversed string.
Example 4:

Input: s = "  Bob    Loves  Alice   "
Output: "Alice Loves Bob"
Example 5:

Input: s = "Alice does not even like bob"
Output: "bob like even not does Alice"


Constraints:

1 <= s.length <= 104
s contains English letters (upper-case and lower-case), digits, and spaces ' '.
There is at least one word in s.


Follow-up: If the string data type is mutable in your language, can you solve it in-place with O(1) extra space?
*/

function reverseWords(input: string): string {
  const reversed = reverse(input);
  let result = '';
  for (let i = 0; i < reversed.length; ++i) {
    if (reversed[i] !== ' ') {
      if (result.length !== 0) {
        result += ' ';
      }
      let j = i;
      for (; j < reversed.length && reversed[j] !== ' '; ++j) {
        result += reversed[j];
      }
      result = reverse(result, result.length - (j - i), result.length - 1);
      i = j;
    }
  }
  return result;

  function reverse(input: string, left = 0, right = input.length - 1) {
    const reversed = [...input];
    for (; left < right; ++left, --right) {
      const temp = reversed[right];
      reversed[right] = reversed[left];
      reversed[left] = temp;
    }
    return reversed.join('');
  }
}
