// 296. Best Meeting Point
// Difficulty: Medium

// A group of two or more people wants to meet and minimize the total travel distance. You are given a 2D grid of values 0 or 1, where each 1 marks the home of someone in the group. The distance is calculated using Manhattan Distance, where distance(p1, p2) = |p2.x - p1.x| + |p2.y - p1.y|.

// For example, given three people living at (0,0), (0,4), and (2,2):

// 1 - 0 - 0 - 0 - 1
// |   |   |   |   |
// 0 - 0 - 0 - 0 - 0
// |   |   |   |   |
// 0 - 0 - 1 - 0 - 0
// The point (0,2) is an ideal meeting point, as the total travel distance of 2+2+2=6 is minimal. So return 6.

// Hint:
// Try to solve it in one dimension first. How can this solution apply to the two dimension case?

// Time:  O(m * n)
// Space: O(m + n)

#import <Foundation/Foundation.h>

NSInteger PartitionAroundPivot(NSInteger left, NSInteger right, NSInteger pivotIdx, NSMutableArray* nums) {
  [nums exchangeObjectAtIndex:pivotIdx withObjectAtIndex:right];
  int pivot = [nums[right] intValue];
  NSInteger newPivotIdx = left;
  for (NSInteger i = left; i < right; ++i) {
    if ([nums[i] intValue] < pivot) {
      [nums exchangeObjectAtIndex:newPivotIdx++ withObjectAtIndex:i];
    }
  }
  [nums exchangeObjectAtIndex:newPivotIdx withObjectAtIndex:right];
  return newPivotIdx;
}

int findKthSmallest(NSMutableArray* nums, int k) {
  NSInteger left = 0, right = [nums count] - 1;
  while (left <= right) {
    NSInteger pivotIdx = left + arc4random_uniform((int)(right - left + 1));
    NSInteger newPivotIdx = PartitionAroundPivot(left, right, pivotIdx, nums);
    if (newPivotIdx == k - 1) {
      return [nums[newPivotIdx] intValue];
    } else if (newPivotIdx > k - 1) {
      right = newPivotIdx - 1;
    } else {
      left = newPivotIdx + 1;
    }
  }
  return [nums[left] intValue];
}

int minTotalDistance(NSArray* grid) {
  NSMutableArray* x = @[].mutableCopy;
  NSMutableArray* y = @[].mutableCopy;
  for (int i = 0; i < grid.count; ++i) {
    for (int j = 0; j < [grid[0] count]; ++j) {
      if ([grid[i][j] intValue]) {
        [x addObject:@(i)];
        [y addObject:@(j)];
      }
    }
  }
  // Find median, in even-number-of-element array, pick either 1st, or 2nd median
  const int midX = findKthSmallest(x, (int)x.count / 2);
  const int midY = findKthSmallest(y, (int)y.count / 2);
  
  int sum = 0;
  for (int i = 0; i < grid.count; ++i) {
    for (int j = 0; j < [grid[0] count]; ++j) {
      if ([grid[i][j] intValue]) {
        sum += abs(midX - i) + abs(midY - j);
      }
    }
  }
  return sum;
}