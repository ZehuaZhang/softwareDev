// 253. Meeting Rooms II
// Difficulty : Medium

// Given an array of meeting time intervals consisting of start and end times [[s1,e1],[s2,e2],...] (si < ei),
// find the minimum number of conference rooms required.

// For example,
// Given [[0, 30],[5, 10],[15, 20]],
// return 2.

// Time:  O(nlogn)
// Space: O(n)

#import <Foundation/Foundation.h>

@interface Interval : NSObject

@property (atomic, assign) int start;
@property (atomic, assign) int end;

@end

int minMeetingRooms(NSArray* intervals) {
  NSMutableArray* starts = @[].mutableCopy;
  NSMutableArray* ends = @[].mutableCopy;
  
  for (Interval* interval in intervals) {
    [starts addObject:@(interval.start)];
    [ends addObject:@(interval.end)];
  }
  
  [starts sortUsingComparator:^NSComparisonResult(id  _Nonnull obj1, id  _Nonnull obj2) {
    return [obj1 compare:obj2];
  }];
  [ends sortUsingComparator:^NSComparisonResult(id  _Nonnull obj1, id  _Nonnull obj2) {
    return [obj1 compare:obj2];
  }];
  
  int minRooms = 0, cntRooms = 0;
  for (int s = 0, e = 0; s < [starts count];) {
    if ([starts[s] isLessThan:ends[e]]) {
      // acquire a room, update the min number of rooms.
      minRooms = MAX(minRooms, ++cntRooms);
      ++s;
    } else {
      --cntRooms;  // Release a room.
      ++e;
    }
  }
  return minRooms;
}
