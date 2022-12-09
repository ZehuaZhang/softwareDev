/*
Given two strings s and t, return true if they are equal when both are typed into empty text editors. '#' means a backspace character.

Note that after backspacing an empty text, the text will continue empty.



Example 1:

Input: s = "ab#c", t = "ad#c"
Output: true
Explanation: Both s and t become "ac".
Example 2:

Input: s = "ab##", t = "c#d#"
Output: true
Explanation: Both s and t become "".
Example 3:

Input: s = "a##c", t = "#a#c"
Output: true
Explanation: Both s and t become "c".
Example 4:

Input: s = "a#c", t = "b"
Output: false
Explanation: s becomes "c" while t becomes "b".


Constraints:

1 <= s.length, t.length <= 200
s and t only contain lowercase letters and '#' characters.


Follow up: Can you solve it in O(n) time and O(1) space?
*/

function backspaceCompare(s1: string, s2: string): boolean {
  for (let i = s1.length - 1, j = s2.length - 1; i >= 0 || j >= 0; --i, --j) {
    for (let count = 0; i >= 0 && (count > 0 || s1[i] === '#'); --i) {
      if (s1[i] === '#') {
        ++count;
      } else {
        --count;
      }
    }
    for (let count = 0; j >= 0 && (count > 0 || s2[j] === '#'); --j) {
      if (s2[j] === '#') {
        ++count;
      } else {
        --count;
      }
    }
    if (i < 0 || j < 0 || s1[i] !== s2[j]) {
      return i === -1 && j === -1;
    }
  }
  return true;
}
