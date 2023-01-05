/*
420. Strong Password Checker

A password is considered strong if the below conditions are all met:

It has at least 6 characters and at most 20 characters.
It contains at least one lowercase letter, at least one uppercase letter, and at least one digit.
It does not contain three repeating characters in a row (i.e., "Baaabb0" is weak, but "Baaba0" is strong).
Given a string password, return the minimum number of steps required to make password strong. if password is already strong, return 0.

In one step, you can:

Insert one character to password,
Delete one character from password, or
Replace one character of password with another character.


Example 1:

Input: password = "a"
Output: 5
Example 2:

Input: password = "aA1"
Output: 3
Example 3:

Input: password = "1337C0d3"
Output: 0


Constraints:

1 <= password.length <= 50
password consists of letters, digits, dot '.' or exclamation mark '!'.
*/

function strongPasswordChecker(input: string): number {
  const {length} = input;

  let [missLower, missUpper, missDigit] = [1, 1, 1];
  for (const char of input) {
    if (char >= 'a' && char <= 'z') {
      missLower = 0;
    } else if (char >= 'A' && char <= 'Z') {
      missUpper = 0;
    } else if (char >= '0' && char <= '9') {
      missDigit = 0;
    }
  }

  const miss = missLower + missUpper + missDigit;
  let removeOneChar = 0;
  let removeTwoChar = 0;
  let replace = 0;
  for (let i = 2; i < length; ++i) {
    if (input[i] === input[i - 1] && input[i - 1] === input[i - 2]) {
      let cnt = 3;
      while (i + 1 < length && input[i + 1] === input[i]) {
        ++i;
        ++cnt;
      }
      if (cnt % 3 === 0) {
        ++removeOneChar;
      } else if (cnt % 3 === 1) {
        ++removeTwoChar;
      }
      replace += Math.trunc(cnt / 3);
    }
  }

  if (length < 6) {
    return Math.max(6 - length, miss);
  }
  if (length <= 20) {
    return Math.max(replace, miss);
  }
  const overflow = length - 20;
  replace -= Math.min(overflow, removeOneChar);
  if (overflow - removeOneChar > 0) {
    replace -= Math.min(
      Math.trunc((overflow - removeOneChar) / 2),
      removeTwoChar
    );
  }
  if (overflow - removeOneChar - 2 * removeTwoChar > 0) {
    replace -= Math.trunc((overflow - removeOneChar - 2 * removeTwoChar) / 3);
  }
  return overflow + Math.max(replace, miss);
}
