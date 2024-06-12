/*
151. Reverse Words in a String

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
 

Constraints:

1 <= s.length <= 104
s contains English letters (upper-case and lower-case), digits, and spaces ' '.
There is at least one word in s.
 

Follow-up: If the string data type is mutable in your language, can you solve it in-place with O(1) extra space?
*/

function reverseWords(s: string): string {
  const result: string[] = [];

  for (let i = s.length - 1; i >= 0; --i) {
    if (s[i] === ' ') {
      continue;
    }
    let w = '';
    let j = i;
    for (; j >= 0 && s[j] !== ' '; --j) {
      w += s[j];
    }
    result.push(reverse(w));
    i = j;
  }

  return result.join(' ');

  function reverse(s: string) {
    const rev = [...s];
    for (let l = 0, r = s.length - 1; l < r; ++l, --r) {
      const tmp = rev[l];
      rev[l] = rev[r];
      rev[r] = tmp;
    }
    return rev.join('');
  }
}
