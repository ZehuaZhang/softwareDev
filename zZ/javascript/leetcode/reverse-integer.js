// 7. Reverse Integer
// Easy

// Given a 32-bit signed integer, reverse digits of an integer.

// Example 1:

// Input: 123
// Output: 321
// Example 2:

// Input: -123
// Output: -321
// Example 3:

// Input: 120
// Output: 21
// Note:
// Assume we are dealing with an environment which could only store integers within the 32-bit signed integer range: [−231,  231 − 1]. For the purpose of this problem, assume that your function returns 0 when the reversed integer overflows.

/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    let result = 0
    
    const maxInteger = Math.pow(2, 31) - 1
    const minInteger = -1 * Math.pow(2, 31)
    
    while (x) {
        if (result > Math.trunc(maxInteger / 10) ||
            (result === maxInteger / 10 && x % 10 > maxInteger % 10)) {
            
            return 0
            }
        
        if (result < Math.trunc(minInteger / 10) ||
           (result === minInteger / 10 && x % 10 < minInteger % 10)) {
            return 0
        }
        result = result * 10 + x % 10
        x = Math.trunc(x / 10)
    }
    
    return result
};