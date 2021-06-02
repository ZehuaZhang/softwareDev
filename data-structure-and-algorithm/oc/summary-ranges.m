// 228. Summary Ranges
// Difficulty: Medium

// Given a sorted integer array without duplicates, return the summary of its ranges.

// For example, given [0,1,2,4,5,7], return ["0->2","4->5","7"].

// Time:  O(n)
// Space: O(1)

#import <Foundation/Foundation.h>

NSArray* summaryRanges(NSArray* nums) {
  NSMutableArray* ranges = @[].mutableCopy;

  int start = [nums[0] intValue], end = [nums[0] intValue];
  for (int i = 1; i <= [nums count]; ++i) {
    if (i < [nums count] && [nums[i] intValue] == end + 1) {
      end = [nums[i] intValue];
    } else {
      if (start != end) {
        [ranges addObject:[NSString stringWithFormat:@"%d->%d", start, end]];
      } else {
        [ranges addObject:[NSString stringWithFormat:@"%d", start]];
      }
      if (i < [nums count]) {
        start = end = [nums[i] intValue];
      }
    }
  }
  
  return ranges;
}