// 360. Sort Transformed Array
// Difficulty : Medium

// Given a sorted array of integers nums and integer values a, b and c. Apply a function of the form f(x) = ax2 + bx + c to each element x in the array.

// The returned array must be in sorted order.

// Expected time complexity: O(n)

// Example:
// nums = [-4, -2, 2, 4], a = 1, b = 3, c = 5,

// Result: [3, 9, 15, 33]

// nums = [-4, -2, 2, 4], a = -1, b = 3, c = 5

// Result: [-23, -5, 1, 7]

// Time:  O(n)
// Space: O(1)

#import <Foundation/Foundation.h>

int f(int x, int a, int b, int c) {
  return a * x * x + b * x + c;
};

NSArray* sortTransformedArray(NSArray* nums, int a, int b, int c) {
  NSMutableArray* result = @[].mutableCopy;

  int d = a > 0 ? -1 : 1; // a > 0 concave, decrease then increase; a < 0 convex, increase then decrease
  for (NSInteger left = 0, right = nums.count - 1; left <= right;) {
    int yLeft = f([nums[left] intValue], a, b, c);
    int yRight = f([nums[right] intValue], a, b, c);
    
    if (d * yLeft < d * yRight) {
      [result addObject:@(yLeft)];
      ++left;
    } else {
      [result addObject:@(yRight)];
      --right;
    }
  }
  if (d == -1) {
    return [[result reverseObjectEnumerator] allObjects];
  }
  return result;
}