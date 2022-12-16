/*
Given a string s, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.



Example 1:

Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.
Example 2:

Input: s = "race a car"
Output: false
Explanation: "raceacar" is not a palindrome.


Constraints:

1 <= s.length <= 2 * 105
s consists only of printable ASCII characters.
*/

function isPalindrome(input: string): boolean {
  for (let left = 0, right = input.length - 1; left < right; ) {
    if (!isAlphaNumeric(input[left])) {
      ++left;
    } else if (!isAlphaNumeric(input[right])) {
      --right;
    } else if (input[left++].toLowerCase() !== input[right--].toLowerCase()) {
      return false;
    }
  }
  return true;
}

function isAlphaNumeric(char: string): boolean {
  return Boolean(char.match(/[0-9a-zA-Z]/g));
}
