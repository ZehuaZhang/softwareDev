// 420. Strong Password Checker
// Difficulty: Hard

// A password is considered strong if below conditions are all met:

// It has at least 6 characters and at most 20 characters.
// It must contain at least one lowercase letter, at least one uppercase letter, and at least one digit.
// It must NOT contain three repeating characters in a row ("...aaa..." is weak, but "...aa...a..." is strong,
// assuming other conditions are met).

// Write a function strongPasswordChecker(s), that takes a string s as input,
// and return the MINIMUM change required to make s a strong password. If s is already strong, return 0.

// Insertion, deletion or replace of any one character are all considered as one change.

// Time:  O(n)
// Space: O(1)

class Solution {
public:
  int strongPasswordChecker(string s) {
    int missType = 3;
    missType -= static_cast<int>(any_of(s.begin(), s.end(), [](char c){ return isdigit(c); }));
    missType -= static_cast<int>(any_of(s.begin(), s.end(), [](char c){ return isupper(c); }));
    missType -= static_cast<int>(any_of(s.begin(), s.end(), [](char c){ return islower(c); }));

    int change = 0;
    int one = 0, two = 0, three = 0;  // replace one characted replacement with how many character deletion
    for (int i = 2; i < s.length();) {
      if (s[i] == s[i - 1] && s[i - 1] == s[i - 2]) {
        int length = 2;
        while (i < s.length() && s[i] == s[i - 1]) {
          ++length;
          ++i;
        }
        change += length / 3;
        if (length % 3 == 0) {
          ++one;
        } else if (length % 3 == 1) {
          ++two;
        } else {
          ++three;
        }
      } else {
        ++i;
      }
    }

    if (s.length() < 6) {
      return max(missType, 6 - static_cast<int>(s.length()));
    } else if (s.length() <= 20) {
      return max(missType, change);
    }

    int remove = s.length() - 20;

    change -= min(remove, one * 1) / 1;
    change -= min(max(remove - one * 1, 0), two * 2) / 2;
    change -= min(max(remove - one * 1 - two * 2, 0), three * 3) / 3;

    return remove + max(missType, change);
  }
};