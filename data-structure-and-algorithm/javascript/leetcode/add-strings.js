/**
Given two non-negative integers, num1 and num2 represented as string, return the sum of num1 and num2 as a string.

You must solve the problem without using any built-in library for handling large integers (such as BigInteger). You must also not convert the inputs to integers directly.

 

Example 1:

Input: num1 = "11", num2 = "123"
Output: "134"
Example 2:

Input: num1 = "456", num2 = "77"
Output: "533"
Example 3:

Input: num1 = "0", num2 = "0"
Output: "0"
 

Constraints:

1 <= num1.length, num2.length <= 104
num1 and num2 consist of only digits.
num1 and num2 don't have any leading zeros except for the zero itself.
*/

/**
 * 
 * @param { string } num1 
 * @param { string } num2 
 * @returns { string }
 */
function addStrings(num1, num2) {
    let result = '';
    let carry = 0;
    const m = num1.length, n = num2.length;
    for (const i = 0; i < Math.max(m, n); ++i) {
        const a = i < m ? num1[m - 1 - i] - '0': 0;
        const b = i < n ? num2[n - 1 - i] - '0': 0;
        const sum = a + b + carry;
        carry = Math.trunc(sum / 10);
        result += sum % 10;
    }

    if (carry === 1) {
        result += carry;
    }

    return [...result].reverse().join("");
}