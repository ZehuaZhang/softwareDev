// 221. Maximal Square
// Difficulty: Medium

// Given a 2D binary matrix filled with 0 and 1, find the largest square containing only 1 and return its area.

// For example, given the following matrix:

// 1 0 1 0 0
// 1 0 1 1 1
// 1 1 1 1 1
// 1 0 0 1 0
// Return 4.

// Time:  O(m * n), where m is row, n is col
// Space: O(n)

// Ascending stack solution.

#import <Foundation/Foundation.h>

#pragma mark Stack

@interface Stack : NSObject

- (instancetype)init;
- (id)pop;
- (void)push:(id)element;

@end

@implementation Stack

NSMutableArray* _array;

- (instancetype)init {
  self = [super init];
  if (self) {
    _array = [[NSMutableArray alloc] init];
  }
  return self;
}

- (BOOL)isEmpty {
  return [_array count] == 0;
}

- (void)push:(id)element {
  [_array addObject:element];
}

- (id)pop {
  if (self.isEmpty) {
    return nil;
  }
  id element = [_array lastObject];
  if (element) {
    [_array removeLastObject];
  }
  return element;
}

- (id)top {
  if (self.isEmpty) {
    return nil;
  }
  return [_array lastObject];
}

@end

#pragma mark Solution

int maximalRectangleTillCurrRow(NSArray* h) {
  Stack* index = [[Stack alloc] init];  // store index of heights
  NSArray* heights = [h arrayByAddingObject:@(0)]; // for final calculate
  int maxArea = 0;
  
  for (int i = 0; i < [heights count];) {
    if ([index isEmpty] || [heights[i] intValue] > [heights[[[index top] intValue]] intValue]) {
      [index push:@(i++)];
    } else {
      int idx = [[index pop] intValue];
      int len = [index isEmpty] ? i : i - [[index top] intValue] - 1;
      maxArea = MAX(maxArea, [heights[idx] intValue] * len);
    }
  }
  return maxArea;
}

int maximalRectangle(NSArray* matrix) {
  if (![matrix count]) {
    return 0;
  }
  int maxArea = 0;
  NSMutableArray* heights = [[NSMutableArray alloc] init];
  for (int j = 0; j < [matrix[0] count]; j++) {
    heights[j] = @(0);
  }
  
  for (int i = 0; i < [matrix count]; ++i) {
    for (int j = 0; j < [matrix[0] count]; ++j) {
      heights[j] = [matrix[i][j] intValue] == '1' ? @([heights[j] intValue] + 1) : @(0);
    }
    maxArea = MAX(maxArea, maximalRectangleTillCurrRow(heights));
  }
  return maxArea;
}

