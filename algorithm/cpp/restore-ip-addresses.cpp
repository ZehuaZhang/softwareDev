// 93. Restore IP Addresses
// Difficulty: Medium

// Given a string containing only digits, restore it by returning all possible valid IP address combinations.

// For example:
// Given "25525511135",

// return ["255.255.11.135", "255.255.111.35"]. (Order does not matter)

// Time Complexity: O(n^m), where n is max length of number, m is count of segment
// Space Complexity: O(nm)

class Solution {
public:
  vector<string> restoreIpAddresses(string s) {
    vector<string> ans;
    restoreIpAddresses(s, 0, 4, "", ans);
    return ans;
  }

private:
  void restoreIpAddresses(const string& s, int start, int step, string ip, vector<string>& ans) {
    if (start == s.size() && step == 0) {
      ip.pop_back();
      ans.push_back(ip);
      return;
    }

    if (s.size() - start < step || s.size() - start > step * 3) {
      return;
    }
    int num = 0;
    for (int i = start; i < start + 3; ++i) {
      num = num * 10 + s[i] - '0';
      if (num > 255) {
        break;
      }
      restoreIpAddresses(s, i + 1, step - 1, ip + to_string(num) + '.', ans);
      if (num == 0) {
        break; // only one 0
      }
    }
  }
};
