// 93. Restore IP Addresses
// Difficulty: Medium

// Given a string containing only digits, restore it by returning all possible valid IP address combinations.

// For example:
// Given "25525511135",

// return ["255.255.11.135", "255.255.111.35"]. (Order does not matter)

// Time Complexity: O(n^m), where n is max length of number, m is count of segment
// Space Complexity: O(nm)

#import <Foundation/Foundation.h>

void restoreIpAddressesHelper(NSString* s, int start, int step, NSString* ip, NSMutableArray** ans) {
  if (start == [s length] && step == 0) {
    [*ans addObject: [ip substringToIndex:[ip length] - 1]];
    return;
  }
  
  if ([s length] - start < step ||
      [s length] - start > step * 3) { // pruning
    return;
  }
  
  int num = 0;
  for (int i = start; i < start + 3; ++i) {
    num = num * 10 + [s characterAtIndex:i] - '0';
    if (num > 255) {
      break;
    }
    restoreIpAddressesHelper(s, i + 1, step - 1, [ip stringByAppendingFormat:@"%d.", num], ans);
    if (num == 0) {
      break; // only one 0
    }
  }
}

NSArray* restoreIpAddresses(NSString* s) {
  NSMutableArray* ans = [NSMutableArray array];
  restoreIpAddressesHelper(s, 0, 4, @"", &ans);
  return ans;
}
