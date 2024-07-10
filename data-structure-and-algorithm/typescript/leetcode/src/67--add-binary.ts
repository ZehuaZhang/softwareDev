/**
67. Add Binary

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

function addBinary(a: string, b: string): string {
  const rslt: number[] = [];

  for (let i = a.length - 1, j = b.length - 1, c = 0; i >= 0 || j >= 0 || c;) {
    const x = i >= 0 ? Number(a[i--]) : 0;
    const y = j >= 0 ? Number(b[j--]) : 0;
    const s = x + y + c;
    rslt.push(s % 2);
    c = Math.trunc(s / 2);
  }

  return rslt.reverse().join('');
}
