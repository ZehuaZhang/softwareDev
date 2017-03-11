// 130. Surrounded Regions
// Difficulty: Medium

// Given a 2D board containing 'X' and 'O' (the letter O), capture all regions surrounded by 'X'.

// A region is captured by flipping all 'O's into 'X's in that surrounded region.

// For example,
// X X X X
// X O O X
// X X O X
// X O X X
// After running your function, the board should be:

// X X X X
// X X X X
// X X X X
// X O X X

// Time:  O(m * n)
// Space: O(m + n)

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

#pragma mark GraphNode

@interface GraphNode : NSObject <NSCopying>

@property (atomic, assign) NSInteger label;
@property (atomic, strong) NSMutableArray *neighbors;

- (instancetype)initWithValue:(NSInteger)value;

@end

@implementation GraphNode

- (instancetype)initWithValue:(NSInteger)label {
  self = [super init];
  if (self) {
    self.label = label;
  }
  return self;
}

- (id)copyWithZone:(NSZone *)zone {
  GraphNode* copied = [[[self class] allocWithZone:zone] init];
  if (copied) {
    copied.label = self.label;
    copied.neighbors = [self.neighbors mutableCopy];
  }
  return copied;
}

@end

#pragma mark Solution

void solve(NSMutableArray* board) {
  if (![board count]) {
    return;
  }
  
  Queue *queue = [[Queue alloc] init];
  for (int i = 0; i < [board count]; ++i) {
    [queue push:@[@(i), @0]];
    [queue push:@[@(i), @([board[0] count] - 1)]];
  }
  for (int j = 0; j < [board[0] count]; ++j) {
    [queue push:@[@0, @(j)]];
    [queue push:@[@([board count] - 1), @(j)]];
  }
  
  while (![queue isEmpty]) {
    NSArray* pos = [queue pop];
    int i = [pos[0] intValue];
    int j = [pos[1] intValue];
    
    if ([board[i][j] charValue] == 'O') {
      board[i][j] = @('V');
      NSArray* directions = @[@[@0, @(-1)], @[@0, @1], @[@(-1), @0], @[@1, @0]];
      for (id dir in directions) {
        const int x = i + [dir[0] intValue], y = j + [dir[1] intValue];
        if (0 <= x  && x < [board count] &&
            0 <= y && y < [board[0] count] &&
            [board[x][y] charValue]== 'O') {
          [queue push:@[@(x), @(y)]];
        }
      }
    }
  }
  
  for (int i = 0; i < [board count]; ++i) {
    for (int j = 0; j < [board[0] count]; ++j) {
      if ([board[i][j] charValue] != 'V') {
        board[i][j] = @('X');
      } else {
        board[i][j] = @('O');
      }
    }
  }
}
