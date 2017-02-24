// 66. Plus One
// Difficulty: Easy
// Given a non-negative number represented as an array of digits, plus one to the number.

// The digits are stored such that the most significant digit is at the head of the list.

// Time:  O(n)
// Space: O(1)

class Solution {
public:
    vector<int> plusOne(vector<int>& digits) {
        int carry = 1;
        for (auto it = digits.rbegin(); it != digits.rend(); ++it) {
            int sum = *it + carry;
            *it = sum % 10;
            carry = sum / 10;
        }
        if (carry == 1) {
            digits.insert(digits.begin(), carry);
        }
        return digits;  
    }
};
