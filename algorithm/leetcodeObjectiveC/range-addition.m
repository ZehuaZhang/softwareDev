// 370. Range Addition
// Difficulty: Medium

// Assume you have an array of length n initialized with all 0 and are given k update operations.

// Each operation is represented as a triplet: [startIndex, endIndex, inc] which increments each element of subarray
// A[startIndex ... endIndex] (startIndex and endIndex inclusive) with inc.

// Return the modified array after all k operations were executed.

// Example:

// Given:
//     length = 5,
//     updates = [
//         [1,  3,  2],
//         [2,  4,  3],
//         [0,  2, -2]
//     ]

// Output:
//     [-2, 0, 3, 5, 3]

// Explanation:

// Initial state:
// [ 0, 0, 0, 0, 0 ]

// After applying operation [1, 3, 2]:
// [ 0, 2, 2, 2, 0 ]

// After applying operation [2, 4, 3]:
// [ 0, 2, 5, 5, 3 ]

// After applying operation [0, 2, -2]:
// [-2, 0, 3, 5, 3 ]

// Hint:
// Thinking of using advanced data structures? You are thinking it too complicated.
// For each update operation, do you really need to update all elements between i and j?
// Update only the first and end element is sufficient.
// The optimal time complexity is O(k + n) and uses O(1) extra space.

// Time:  O(k + n)
// Space: O(1)

#import <Foundation/Foundation.h>

NSArray* getModifiedArray(int length, NSArray* updates) {
  int result[length];
  
  for (id update in updates) {
    result[[update[0] intValue]] += [update[2] intValue]; // add action to start
    if ([update[1] intValue] + 1 < length) {   // add action to end, if end is not last position
      result[[update[1] intValue] + 1] -= [update[2] intValue];
    }
  }
  for (int i = 1; i < length; ++i) {
    result[i] += result[i - 1]; // successor is the result of predecessor's action
  }
  NSMutableArray* ans = @[].mutableCopy;
  for (int i = 0; i < length; i++) {
    ans[i] = @(result[i]);
  }
  return ans;
}
