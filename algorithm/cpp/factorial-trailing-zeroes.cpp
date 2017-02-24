// 172. Factorial Trailing Zeroes
// Difficulty: Easy

// Given an integer n, return the number of trailing zeroes in n!.

// Note: Your solution should be in logarithmic time complexity.

// Time:  O(logn) = O(1)
// Space: O(1)

class Solution {
public:
    int trailingZeroes(int n) {
        int number = 0;
        while (n > 0) {
        	number += n / 5;	// number <=> 10s <=> 5s, for 2s more than 5s
            n /= 5;	// 25, 125, ..., which has more than one 5 factor
        }
        return number;
    }
};
