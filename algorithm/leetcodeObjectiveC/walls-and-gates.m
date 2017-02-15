// 286. Walls and Gates
// Difficulty : Medium

// You are given a m x n 2D grid initialized with these three possible values.

// -1 - A wall or an obstacle.
// 0 - A gate.
// INF - Infinity means an empty room. We use the value 2^31 - 1 = 2147483647
// to represent INF as you may assume that the distance to a gate is less than 2147483647.
// Fill each empty room with the distance to its nearest gate.
// If it is impossible to reach a gate, it should be filled with INF.

// For example, given the 2D grid:
// INF  -1  0  INF
// INF INF INF  -1
// INF  -1 INF  -1
//   0  -1 INF INF

// After running your function, the 2D grid should be:
//   3  -1   0   1
//   2   2   1  -1
//   1  -1   2  -1
//   0  -1   3   4

// Time:  O(m * n)
// Space: O(g)

#import <Foundation/Foundation.h>

#pragma mark Queue

@interface Queue : NSObject

@property (readonly, strong) id front;
@property (readonly, strong) id back;

- (instancetype)init;
- (id)pop;
- (void)push:(id)element;
- (id)front;
-(NSInteger)count;

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

-(NSInteger)count {
  return _array.count;
}

@end

#pragma mark Solution

void wallsAndGates(NSArray* rooms) {
  const int INF = INT_MAX;
  Queue* queue = [[Queue alloc] init];
  for (int i = 0; i < rooms.count; ++i) {
    for (int j = 0; j < [rooms[0] count]; ++j) {
      if (rooms[i][j] == 0) {
        [queue push:@[@(i), @(j)]];
      }
    }
  }
  while (![queue isEmpty]) {
    int i = [[queue front][0] intValue];
    int j = [[queue front][1] intValue];
    [queue pop];
    for (id dir in @[@[@(i + 1), @(j)], @[@(i - 1), @(j)], @[@(i), @(j + 1)], @[@(i), @(j - 1)]]) {
      int nextI = [dir[0] intValue];
      int nextJ = [dir[1] intValue];
      if (nextI >= 0 && nextI < rooms.count && nextJ >= 0 && nextJ < [rooms[0] count] &&
          [rooms[nextI][nextJ] intValue] == INF) {
        rooms[nextI][nextJ] = @([rooms[i][j] intValue] + 1);
        [queue push:@[@(nextI), @(nextJ)]];
      }
    }
  }
}