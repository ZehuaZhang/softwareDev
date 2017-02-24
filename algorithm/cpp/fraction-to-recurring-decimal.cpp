// 166. Fraction to Recurring Decimal
// Difficulty: Medium

// Given two integers representing the numerator and denominator of a fraction, return the fraction in string format.

// If the fractional part is repeating, enclose the repeating part in parentheses.

// For example,

// Given numerator = 1, denominator = 2, return "0.5".
// Given numerator = 2, denominator = 1, return "2".
// Given numerator = 2, denominator = 3, return "0.(6)".

// Hint:
// No scary math, just apply elementary math knowledge. Still remember how to perform a long division?
// Try a long division on 4/9, the repeating part is obvious. Now try 4/333. Do you see a pattern?
// Be wary of edge cases! List out as many test cases as you can think of and test your code thoroughly.

// Time:  O(logn), where logn is the length of result strings
// Space: O(1)

class Solution {
public:
    string fractionToDecimal(int numerator, int denominator) {
        string result;
        if ((numerator ^ denominator) >> 31 && numerator != 0) {
            result = "-";
        }

        auto a = llabs(numerator);
        auto b = llabs(denominator);
        result += to_string(a / b);

        if (a % b > 0) {
            result += ".";
        }
        
        unordered_map<long long, int> idx;
        for (a %= b; a && !idx.count(a); a %= b) {
            idx[a] = result.length();
            a *= 10;
            result += to_string(a / b);
        }

        if (idx.count(a)) {
            result.insert(idx[a], "(");
            result.push_back(')');
        }
        return result;
    }
};
