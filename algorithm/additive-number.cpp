306. Additive Number
Difficulty: Medium

Additive number is a string whose digits can form additive sequence.

A valid additive sequence should contain at least three numbers.
Except for the first two numbers, each subsequent number in the sequence must be the sum of the preceding two.

For example:
"112358" is an additive number because the digits can form an additive sequence: 1, 1, 2, 3, 5, 8.

1 + 1 = 2, 1 + 2 = 3, 2 + 3 = 5, 3 + 5 = 8
"199100199" is also an additive number, the additive sequence is: 1, 99, 100, 199.
1 + 99 = 100, 99 + 100 = 199
Note: Numbers in the additive sequence cannot have leading zeros, so sequence 1, 2, 03 or 1, 02, 3 is invalid.

Given a string containing only digits '0'-'9', write a function to determine if its an additive number.

Follow up:
How would you handle overflow for very large input integers?

// Time:  O(n^3)
// Space: O(n)

class Solution {
public:
    bool isAdditiveNumber(string num) {
        for (int i = 1; i < num.length(); ++i) {
            for (int j = i + 1; j < num.length(); ++j) {
                string s1 = num.substr(0, i);
                string s2 = num.substr(i, j - i);
                if ((s1.length() > 1 && s1[0] == '0') ||
                    (s2.length() > 1 && s2[0] == '0')) {
                    continue;
                }
                
                string next = add(s1, s2);
                string cur = s1 + s2 + next;
                while (cur.length() < num.length()) {
                    s1 = s2;
                    s2 = next;
                    next = add(s1, s2);
                    cur += next;
                }
                if (cur == num) {
                    return true;
                }
            }
        }
        return false;
    }

private:
        string add(const string& s1, const string& s2) {
            string res;
    
            int carry = 0;
            for (int i = 0; i < max(s1.length(), s2.length()); ++i) {
                int a = i < s1.length() ? s1[s1.length() - 1 - i] - '0' : 0;
                int b = i < s2.length() ? s2[s2.length() - 1 - i] - '0' : 0;
                int sum = carry + a + b;
                carry = sum / 10;
                res.push_back('0' + sum % 10);
            }
            if (carry) {
                res.push_back('0' + carry);
            }
            reverse(res.begin(), res.end());
    
            return res;
        }
};
