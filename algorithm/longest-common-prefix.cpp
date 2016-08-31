// Time:  O(n * k), k is the length of the common prefix
// Space: O(1)

class Solution {
public:
    string longestCommonPrefix(vector<string>& strs) {
        if (strs.empty()) {
            return "";
        }

        for (int idx = 0; idx < strs[0].length(); ++idx) {
            for (int i = 0; i < strs.size(); i++) {
                if (idx == strs[i].length() || strs[i][idx] != strs[0][idx]) {
                    return strs[0].substr(0, idx);
                }
            }
        }
        return strs[0];
    }
};
