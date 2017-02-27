// 220. Contains Duplicate III
// Difficulty: Medium

// Given an array of integers, find out whether there are two distinct indices i and j in the array
// such that the difference between nums[i] and nums[j] is at most t and the difference between i and j is at most k.

// Time:  O(nlogk)
// Space: O(k)

#import <Foundation/Foundation.h>

#pragma mark Queue

@interface Queue : NSObject

@property (readonly, strong) id front;
@property (readonly, strong) id back;

- (instancetype)init;
- (id)pop;
- (void)push:(id)element;

@end

@implementation Queue

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
  id element = [_array objectAtIndex:0];
  if (element) {
    [_array removeObjectAtIndex:0];
  }
  return element;
}

- (id)front {
  if (self.isEmpty) {
    return nil;
  }
  return [_array objectAtIndex:0];
}

- (id)back {
  if (self.isEmpty) {
    return nil;
  }
  return [_array lastObject];
}

@end

#pragma mark Solution

NSInteger lower_bound(NSArray* nums, int target) {
  NSInteger left = 0;
  NSInteger right = [nums count] - 1;
  // Find min left s.t. A[left] >= target.
  while (left <= right) {
    NSInteger mid = left + (right - left) / 2;
    if ([nums[mid] integerValue] >= target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return left;
}

BOOL containsNearbyAlmostDuplicate(NSArray* nums, int k, int t) {
  if (k < 0 || t < 0) {
    return NO;
  }
  Queue* window = [[Queue alloc] init];
  NSMutableArray* multiSet = @[].mutableCopy;

  for (int i = 0; i < [nums count ]; ++i) {
    if ([multiSet count] > k) {
      int num = [[window pop] intValue];
      [multiSet removeObjectAtIndex:[multiSet indexOfObject:@(num)]];
    }
    
    [multiSet sortUsingComparator:^NSComparisonResult(id  _Nonnull obj1, id  _Nonnull obj2) {
      return [obj1 compare:obj2];
    }];
    
    const NSInteger index = lower_bound(multiSet, [nums[i] intValue] - t);
    
    if (index == [multiSet count] || ([multiSet[index] intValue] - [nums[i] intValue]) > t) {
      [window push:nums[i]];
      [multiSet addObject:nums[i]];
    } else {
      return YES;
    }
  }
  return NO;
}
