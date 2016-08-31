8. String to Integer (atoi)
Difficulty: Easy

Implement atoi to convert a string to an integer.

Hint: Carefully consider all possible input cases. If you want a challenge, please do not see below and 
ask yourself what are the possible input cases.

Notes: It is intended for this problem to be specified vaguely (ie, no given input specs). 
You are responsible to gather all the input requirements up front.

Update (2015-02-10):
The signature of the C++ function had been updated. If you still see your function signature accepts a const char * argument, 
please click the reload button  to reset your code definition.

// Time: O(n)
// Space: O(1)

class Solution {
public:
    int myAtoi(string str) {
        if (str.empty()) {
            return 0;
        }

        int i = 0;
        // Skip ' '.
        while (str[i] == ' ') {
            ++i;
        }

        // Parse sign.
        int sign = 1;
        if (str[i] == '+') {
            ++i;
        } else if (str[i] == '-') {
            sign = -1;
            ++i;
        }

        int ans = 0;
        // Compute integer.
        for (; i < str.length() && isdigit(str[i]); ++i) {
            int digit = str[i] - '0';
            // overflow
            if (ans > (INT_MAX - digit) / 10) { 
                return sign > 0 ? INT_MAX : INT_MIN;
            }
            ans = ans * 10 + digit;
        }

        return ans * sign;
    }
};
