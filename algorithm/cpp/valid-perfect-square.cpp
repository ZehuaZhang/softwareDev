// 367. Valid Perfect Square
// Difficulty: Medium

// Given a positive integer num, write a function which returns True if num is a perfect square else False.

// Note: Do not use any built-in library function such as sqrt.

// Example 1:

// Input: 16
// Returns: True
// Example 2:

// Input: 14
// Returns: False

// Time:  O(logn)
// Space: O(1)

class Solution {
public:
    bool isPerfectSquare(int num) {
        int left = 1, right = num;
        while (left <= right) {
            const int mid = left + (right - left) / 2;
            if (mid >= num / mid) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        return left == num / left && num % left == 0;
    }
};
