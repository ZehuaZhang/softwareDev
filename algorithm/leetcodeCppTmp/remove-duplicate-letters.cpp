// 316. Remove Duplicate Letters
// Difficulty: Hard

// Given a string which contains only lowercase letters, 
// remove duplicate letters so that every letter appear once and only once. 
// You must make sure your result is the smallest in lexicographical order among all possible results.

// Example:
// Given "bcabc"
// Return "abc"

// Given "cbacdcbc"
// Return "acdb"

// Time:  O(n)
// Space: O(k), k is size of the alphabet

// vector solution, need to know size of the alphabet in advance (4ms)
class Solution {
public:
    string removeDuplicateLetters(string s) {
        const int k = 26;
        vector<int> remaining(k);
        for (const auto& c : s) {
            ++remaining[c - 'a'];
        }

        vector<bool> in_stack(k);
        string stk;
        for (const auto& c : s) {
            if (!inStack[c - 'a']) {
                while (!stk.empty() && stk.back() > c && remaining[stk.back() - 'a']) {
                    in_stack[stk.back() - 'a'] = false;
                    stk.pop_back();
                }
                stk.push_back(c);
                in_stack[c - 'a'] = true;
            }
            --remaining[c - 'a'];
        }
        return stk; 
    }
};