// 118. Pascal Triangle
// Difficulty: Easy
// Given numRows, generate the first numRows of Pascal triangle.

// For example, given numRows = 5,
// Return

// [
//      [1],
//     [1,1],
//    [1,2,1],
//   [1,3,3,1],
//  [1,4,6,4,1]
// ]

// Time:  O(n^2)
// Space: O(n)
class Solution {
public:
  vector<vector<int>> generate(int numRows) {
    vector<vector<int>> result;
    vector<int> array;
    for (int i = 0; i < numRows; i++) {
      for (int j = i - 1; j > 0; j--) {
        array[j] += array[j - 1];
      }
      array.push_back(1);
      result.push_back(array);
    }
    return result;
  }
}