// 12. Integer to Roman
// Difficulty: Medium

// Given an integer, convert it to a roman numeral.

// Input is guaranteed to be within the range from 1 to 3999.

// Time:  O(n)
// Space: O(1)

class Solution {
public:
    string intToRoman(int num) {
        const vector<int> nums{1000, 900, 500, 400, 100, 90,
                               50, 40, 10, 9, 5, 4, 1};
        const vector<string> romans{"M", "CM", "D", "CD", "C", "XC", "L",
                                    "XL", "X", "IX", "V", "IV", "I"};

        string result;
        for (int i = 0; num > 0; ++i) {
            for (int count = num / nums[i]; count; --count) {
                result.append(romans[i]);
            }
            num %= nums[i];
        }        
        return result;
    }
};
