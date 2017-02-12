// 179. Largest Number
// Difficulty: Medium

// Given a list of non negative integers, arrange them such that they form the largest number.

// For example, given [3, 30, 34, 5, 9], the largest formed number is 9534330.

// Note: The result may be very large, so you need to return a string instead of an integer.

// Time:  O(nlogn)
// Space: O(1)

#import <Foundation/Foundation.h>

NSString* largestNumber(NSArray* nums) {
  NSArray* sorted = [nums sortedArrayUsingComparator:^NSComparisonResult(id  _Nonnull obj1, id  _Nonnull obj2) {
    NSString* s1 = [NSString stringWithFormat:@"%d%d", [obj1 intValue], [obj2 intValue]];
    NSString* s2 = [NSString stringWithFormat:@"%d%d", [obj2 intValue], [obj1 intValue]];
    
    return [s2 compare:s1];
  }];
  
  NSString* ans = [sorted componentsJoinedByString:@""];
                     
  if ([ans length] && [ans characterAtIndex:0] == '0')  {
    return @"0";
  }
  return ans;
}
