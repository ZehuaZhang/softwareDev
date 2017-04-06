// 10. Regular Expression Matching
// Difficulty: Hard

// Implement regular expression matching with support for '.' and '*'.

// '.' Matches any single character.
// '*' Matches zero or more of the preceding element.

// The matching should cover the entire input string (not partial).

// The function prototype should be:
// bool isMatch(const char *s, const char *p)

// Some examples:
// isMatch("aa","a") → false
// isMatch("aa","aa") → true
// isMatch("aaa","aa") → false
// isMatch("aa", "a*") → true
// isMatch("aa", ".*") → true
// isMatch("ab", ".*") → true
// isMatch("aab", "c*a*b") → true

// Time:  O(n!)
// Space: O(h)

class Solution {
public:
  bool isMatch(string s, string p) {
    return isMatch(s.c_str(), p.c_str());
	}
private:
	bool isMatch(const char* s, const char* p) {
		if (*p == '\0') {
			return *s == '\0';
		}
		// next char is not '*', then must match current character
		if (*(p + 1) != '*') {
			if (*p == *s || (*p == '.' && *s != '\0')) {
				return isMatch(s + 1, p + 1);
			} else {
				return false;
			}
		} else { // next char is '*'
			while (*p == *s || (*p == '.' && *s != '\0')) {
				if (isMatch(s, p + 2)) {
					return true;
				}
				s++;
			}
			return isMatch(s, p + 2);
		}
	}
};