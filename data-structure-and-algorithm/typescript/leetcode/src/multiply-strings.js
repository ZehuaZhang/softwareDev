/*
Given two non-negative integers num1 and num2 represented as strings, return the product of num1 and num2, also represented as a string.

Note: You must not use any built-in BigInteger library or convert the inputs to integer directly.

 

Example 1:

Input: num1 = "2", num2 = "3"
Output: "6"
Example 2:

Input: num1 = "123", num2 = "456"
Output: "56088"
 

Constraints:

1 <= num1.length, num2.length <= 200
num1 and num2 consist of digits only.
Both num1 and num2 do not contain any leading zero, except the number 0 itself.
*/

function multiply(num1, num2) {
    const result = new Array(num1.length + num2.length).fill(0);

    for (let i = num1.length - 1; i >= 0; --i) {
        for (let j = num2.length - 1; j >= 0; --j) {
            const multi = num1[i] * num2[j];
            const di = i + j + 1, ci = i + j;
            const sum = multi + result[di];
            result[ci] += Math.trunc(sum / 10);
            result[di] = sum % 10;
        }
    }

    return BigInt(result.join("")).toString();
}