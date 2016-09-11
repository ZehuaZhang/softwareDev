168. Excel Sheet Column Title
Difficulty: Easy

Given a positive integer, return its corresponding column title as appear in an Excel sheet.

For example:

    1 -> A
    2 -> B
    3 -> C
    ...
    26 -> Z
    27 -> AA
    28 -> AB

// Time:  O(logn)
// Space: O(1)

// Iterative solution.
class Solution {
public:
    string convertToTitle(int n) {
        string result;
        
        while (n--) {
            result.push_back(n % 26 + 'A');
            n /= 26;
        }
        reverse(result.begin(), result.end());

        return result;
    }
};