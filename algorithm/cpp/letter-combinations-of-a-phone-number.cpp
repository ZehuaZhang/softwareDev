// 17. Letter Combinations of a Phone Number
// Difficulty: Medium

// Given a digit string, return all possible letter combinations that the number could represent.

// Input:Digit string "23"
// Output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].

// Note:
// Although the above answer is in lexicographical order, your answer could be in any order you want.

// Time Complexity: O(3^n)
// Space Complexity: O(n)

class Solution {
public:
  vector<string> letterCombinations(string digits) {
    vector<string> ans;
    string path;
    letterCombinations(digits, 0, path, ans);
    return ans;
  }

private:
  void letterCombinations(const string &digits, size_t curr, string &path, vector<string> &ans) {
    if (curr == digits.size()) {
      ans.push_back(path);
      return;
    }

    for (auto c: keyboard[digits[curr] - '0']) {
      path.push_back(c);
      letterCombinations(digits, curr + 1, path, ans);
      path.pop_back();
    }
  }

  const vector<string> keyboard { " ", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz" };
};
