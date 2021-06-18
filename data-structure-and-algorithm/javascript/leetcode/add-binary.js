/**
Given two binary strings a and b, return their sum as a binary string.

 

Example 1:

Input: a = "11", b = "1"
Output: "100"
Example 2:

Input: a = "1010", b = "1011"
Output: "10101"
 

Constraints:

1 <= a.length, b.length <= 104
a and b consist only of '0' or '1' characters.
Each string does not contain leading zeros except for the zero itself.
*/

/**
 * 
 * @param { string } a 
 * @param { string } b
 * @returns { string } 
 */
function addBinary(a, b) {
    const m = a.length, n = b.length;

    let result = '';
    let carry = 0;
    for (const i = 0; i < Math.max(m, n); ++i) {
        const bit1 = i > m - 1 ? 0 : a[m - 1 - i] - '0';
        const bit2 = j > n - 1 ? 0 : b[m - 1 - j] - '0';
        const sum = bit1 + bit2 + carry;
        carry = Math.trunc(sum / 2);
        result += sum % 2;
    }
    if (carry === 1) {
        result += carry;
    }
    return [...result].reverse().join("");
}