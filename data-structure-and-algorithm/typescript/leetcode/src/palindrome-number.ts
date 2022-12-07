// 9. Palindrome Number

// Determine whether an integer is a palindrome. An integer is a palindrome when it reads the same backward as forward.

// Example 1:

// Input: 121
// Output: true
// Example 2:

// Input: -121
// Output: false
// Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.
// Example 3:

// Input: 10
// Output: false
// Explanation: Reads 01 from right to left. Therefore it is not a palindrome.
// Follow up:

// Coud you solve it without converting the integer to a string?

/**
 * @param {number} x
 * @return {boolean}
 */
const isPalindrome = function (x) {
  if (!isNumber(x)) {
    throw 'invalid input number';
  }

  if (Math.sign(x) < 0) {
    return false;
  }

  const maxInteger = Math.pow(2, 31) - 1;

  let reverseX = 0;
  let copyX = x;
  while (copyX) {
    if (
      reverseX > Math.trunc(maxInteger / 10) ||
      (reverseX === maxInteger / 10 && copyX > maxInteger % 10)
    ) {
      return false;
    }

    reverseX = reverseX * 10 + (copyX % 10);
    copyX = Math.trunc(copyX / 10);
  }

  return reverseX === x;
};

function isNumber(item) {
  return typeof item === 'number';
}
