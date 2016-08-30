201. Bitwise AND of Numbers Range 
Difficulty: Medium
Given a range [m, n] where 0 <= m <= n <= 2147483647, return the bitwise AND of all numbers in this range, inclusive.

For example, given the range [5, 7], you should return 4.

// Time:  O(1)
// Space: O(1)

class Solution {
public:
    int rangeBitwiseAnd(int m, int n) {
        while (m < n) {  // Remove the lsb set until n <= m.
            n &= n - 1;	// <=> n -= n & (-n) <=> n &= ~(-n)
        }
        return n;
    }
};
