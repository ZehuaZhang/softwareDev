// 356. Line Reflection
// Difficulty : Medium

// Given n points on a 2D plane, find if there is such a line parallel to y-axis that reflect the given set of points.

// Example 1:
// Given points = [[1,1],[-1,1]], return true.

// Example 2:
// Given points = [[1,1],[-1,-1]], return false.

// Follow up:
// Could you do better than O(n^2)?

// Hint:
// Find the smallest and largest x-value for all points.
// If there is a line then it should be at y = (minX + maxX) / 2.
// For each point, make sure that it has a reflected point in the opposite side.

// Time:  O(n)
// Space: O(n)

#import <FinderSync/FinderSync.h>

// Hash solution.

BOOL isReflected(NSArray* points) {
  NSMutableDictionary* groupsByY = @{}.mutableCopy;
  int left = INT_MAX, right = INT_MIN;
  for (id point in points) {
    if (!groupsByY[point[1]]) {
      groupsByY[point[1]] = [[NSMutableSet alloc] init];
    }
    [groupsByY[point[1]] addObject:point[0]];
    left = MIN(left, [point[0] intValue]);
    right = MAX(right, [point[0] intValue]);
  }
  int mid = left + right;
  for (id group in groupsByY) {
    for (id x in groupsByY[group]) {
      if (![groupsByY[group] containsObject:@(mid - [x intValue])]) {
        return NO;
      }
    }
  }
  return YES;
}
