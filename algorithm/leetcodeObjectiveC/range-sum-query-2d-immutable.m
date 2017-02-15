// 304. Range Sum Query 2D - Immutable
// Difficulty: Medium

// Given a 2D matrix matrix, find the sum of the elements inside the rectangle defined by its upper left corner (row1, col1)
// and lower right corner (row2, col2).

// Range Sum Query 2D
// The above rectangle (with the red border) is defined by (row1, col1) = (2, 1) and (row2, col2) = (4, 3),
// which contains sum = 8.

// Example:
// Given matrix = [
//   [3, 0, 1, 4, 2],
//   [5, 6, 3, 2, 1],
//   [1, 2, 0, 1, 5],
//   [4, 1, 0, 1, 7],
//   [1, 0, 3, 0, 5]
// ]

// sumRegion(2, 1, 4, 3) -> 8
// sumRegion(1, 1, 2, 2) -> 11
// sumRegion(1, 2, 2, 4) -> 12

// Note:
// You may assume that the matrix does not change.
// There are many calls to sumRegion function.
// You may assume that row1 ≤ row2 and col1 ≤ col2.

// Your NumMatrix object will be instantiated and called as such:
// NumMatrix numMatrix(matrix);
// numMatrix.sumRegion(0, 1, 2, 3);
// numMatrix.sumRegion(1, 2, 3, 4);


// Time:  ctor:   O(m * n),
//        lookup: O(1)
// Space: O(m * n)

#import <Foundation/Foundation.h>

@interface NumMatrix : NSObject
@end

@implementation NumMatrix
  
NSMutableArray* _hist;

-(instancetype)initWithArray:(NSArray*)matrix {
  self = [super init];
  if (self) {
    _hist = @[].mutableCopy;
    for (int i = 0; i <= matrix.count; i++) {
      [_hist addObject:@[].mutableCopy];
      for (int j = 0; j <= [matrix[0] count]; j++) {
        [_hist[i] addObject:@0];
      }
    }
    for (int i = 1; i <= matrix.count; i++) {
        for (int j = 1; j <= [matrix[0] count]; j++) {
          _hist[i][j] = @([_hist[i][j - 1] intValue] + [_hist[i - 1][j] intValue] - [_hist[i - 1][j - 1] intValue] + [matrix[i - 1][j - 1] intValue]);
      }
    }
  }
  return self;
}

-(int)sumRegionWithRow1:(int)row1 col1:(int)col1 row2:(int)row2 col2:(int)col2 {
  return [_hist[row2 + 1][col2 + 1] intValue]- [_hist[row2 + 1][col1] intValue] - [_hist[row1][col2 + 1] intValue] + [_hist[row1][col1] intValue];
}
  
@end

