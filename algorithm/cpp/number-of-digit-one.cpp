// 233. Number of Digit One
// Difficulty: Hard

// Given an integer n, count the total number of digit 1 appearing in all non-negative integers less than or equal to n.

// For example:
// Given n = 13,
// Return 6, because digit 1 occurred in the following numbers: 1, 10, 11, 12, 13.

// Hint:
// Beware of overflow.

// Time:  O(logn) = O(1)
// Space: O(1)

class Solution {
public:
    int countDigitOne(int n) {
        const int k = 1;
        int cnt = 0;

        for (int left = n, multiplier = 1; left > 0; left /= 10, multiplier *= 10) {
            // split number into: left, curr, right
            int curr = left % 10;
            int right = n % multiplier;

            // count of (c000 ~ oooc000) = (ooo + (k < curr)? 1 : 0) * 1000
            cnt += (left / 10 + (k < curr)) * multiplier;

            // if k == 0, oooc000 = (ooo - 1) * 1000
            if (k == 0 && multiplier > 1) {
                cnt -= multiplier;
            }

            // count of (oook000 ~ oookxxx): count += xxx + 1
            if (curr == k) {
                cnt += right + 1;
            }
        }

        return cnt;
    }
};
