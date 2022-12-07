/*
Given two integers n and k, return the kth lexicographically smallest integer in the range [1, n].

 

Example 1:

Input: n = 13, k = 2
Output: 10
Explanation: The lexicographical order is [1, 10, 11, 12, 13, 2, 3, 4, 5, 6, 7, 8, 9], so the second smallest number is 10.
Example 2:

Input: n = 1, k = 1
Output: 1
 

Constraints:

1 <= k <= n <= 109
*/

function findKthNumber(n, k) {

    // prefix
    let result = 1;
    for (--k; k;) {
        let count = 0;

        // [result, result + 1)
        // [result * 10, (result + 1) * 10 )
        // [result * 100, (result + 1) * 100 )
        for (left = result, right = left + 1; left <= n; left *= 10, right *= 10) {
            count += Math.min(n + 1, right) - left;
        }
        if (k >= count) {

            // skip search
            ++result;
            k -= count;
        } else {

            // search within range
            result *= 10;
            --k;
        }
    }
    return result;
}