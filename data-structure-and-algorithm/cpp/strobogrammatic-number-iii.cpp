// 248. Strobogrammatic Number III
// Difficulty : Hard 

// A strobogrammatic number is a number that looks the same when rotated 180 degrees (looked at upside down).

// Write a function to count the total strobogrammatic numbers that exist in the range of low <= num <= high.

// For example,
// Given low = "50", high = "100", return 3. Because 69, 88, and 96 are three strobogrammatic numbers.

// Note:
// Because the range might be a large number, the low and high numbers are represented as string.

// Time:  O(5^(n/2))
// Space: O(n)

class Solution {
public:
  int strobogrammaticInRange(string low, string high) {
    int result = 0;
    strobogrammaticInRange(low, high, "", result);
    strobogrammaticInRange(low, high, "0", result);
    strobogrammaticInRange(low, high, "1", result);
    strobogrammaticInRange(low, high, "8", result);
    return result;
  }
  void strobogrammaticInRange(string low, string high, string path, int& result) {
    if (path.compare(high) > 0) {
        return;
    }
    if (path.size() >= low.size() && path.size() <= high.size()) {
      if (path.compare(low) >= 0 && !(path.size() > 1 && path[0] == '0')) { 
        ++result;
      }
    }
    if (path.size() + 2 > high.size()) {    // prune
      return;
    }
    strobogrammaticInRange(low, high, "0" + path + "0", result);
    strobogrammaticInRange(low, high, "1" + path + "1", result);
    strobogrammaticInRange(low, high, "6" + path + "9", result);
    strobogrammaticInRange(low, high, "8" + path + "8", result);
    strobogrammaticInRange(low, high, "9" + path + "6", result);
  }
};