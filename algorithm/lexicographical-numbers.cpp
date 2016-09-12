386. Lexicographical Numbers
Difficulty: Medium

Given an integer n, return 1 - n in lexicographical order.

For example, given 13, return: [1,10,11,12,13,2,3,4,5,6,7,8,9].

Please optimize your algorithm to use less time and space. The input size may be as large as 5,000,000.

// Time:  O(n)
// Space: O(1)

class Solution {
public:
    vector<int> lexicalOrder(int n) {
        vector<int> result;
 
        for (int i = 1, num = 1; result.size() < n; i = num + 1) {
            for (int k = 0; i * pow(10, k) <= n; ++k) {
                result.emplace_back(i * pow(10, k));
            }

            for (num = result.back() + 1; num <= n && num % 10; ++num) {
                result.emplace_back(num);
            }

            if (num % 10 == 0) {
                --num;
            } else {
                num /= 10;
            }

            while (num % 10 == 9) {
                num /= 10;
            }
        }

        return result;
    }
};
