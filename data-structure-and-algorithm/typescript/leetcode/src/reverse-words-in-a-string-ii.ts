/*
Given an input string , reverse the string word by word.

Example:

Input:  ["t","h","e"," ","s","k","y"," ","i","s"," ","b","l","u","e"]
Output: ["b","l","u","e"," ","i","s"," ","s","k","y"," ","t","h","e"]
Note:

A word is defined as a sequence of non-space characters.
The input string does not contain leading or trailing spaces.
The words are always separated by a single space.
Follow up: Could you do it in-place without allocating extra space?
*/

function reverseWords(s) {
  const rs = reverse(s);
  let result = '';
  for (let i = 0; i < s.length; ++i) {
    if (s[i] !== ' ') {
      if (result.length !== 0) {
        result += ' ';
      }
      let j = i;
      for (; j < s.length && s[j] !== ' '; ++j) {
        result += s[j];
      }
      result = reverse(result, result.length - (j - i), result.length - 1);
      i = j;
    }
  }
  return result;
}

function reverse(s, l = 0, r = s.length - 1) {
  const a = [...s];
  for (; l < r; ++l, --r) {
    const t = a[l];
    a[l] = a[r];
    a[r] = t;
  }
  return a.join('');
}

function reverseWords2(s) {
  for (let l = 0, i = 0; i <= s.length; ++i) {
    if (i === s.length || s[i] === ' ') {
      s = reverse(s, l, i - 1);
      l = i + 1;
    }
  }
  return reverse(s, 0, s.length - 1);
}
