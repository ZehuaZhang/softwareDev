// 163. Missing Ranges
// Difficulty: Medium

// Given a sorted integer array where the range of elements are [lower, upper] inclusive, return its missing ranges.
// For example, given [0, 1, 3, 50, 75], lower = 0 and upper = 99, return ["2", "4->49", "51->74", "76->99"].

// Time:  O(n)
// Space: O(1)

#import <Foundation/Foundation.h>

NSString* getRange(NSInteger lower, NSInteger upper) {
  if (lower == upper) {
    return [NSString stringWithFormat:@"%ld", lower];
  } else {
    return [NSString stringWithFormat:@"%ld->%ld", lower, upper];
  }
}

NSArray *findMissingRange(NSArray *nums, NSInteger lower, NSInteger upper) {
  NSMutableArray *ranges = @[].mutableCopy;

  for (NSInteger i = 0, pre = lower - 1, cur = 0; i <= nums.count; i++, pre = cur) {
    if (i == nums.count) {
      cur = upper + 1;
    } else {
      cur = [nums[i] intValue];
    }
    if (cur - pre >= 2) {
      [ranges addObject:getRange(pre + 1, cur - 1)];
    }
  }
  return [ranges copy];
}