// 353. Design Snake Game
// Difficulty : Medium

// Design a Snake game that is played on a device with screen size = width x height.
// Play the game online if you are not familiar with the game.

// The snake is initially positioned at the top left corner (0,0) with length = 1 unit.

// You are given a list of food's positions in row-column order. When a snake eats the food,
// its length and the game's score both increase by 1.

// Each food appears one by one on the screen. For example, the second food will not appear
// until the first food was eaten by the snake.

// When a food does appear on the screen, it is guaranteed that it will not appear on a block occupied by the snake.

// Example:
// Given width = 3, height = 2, and food = [[1,2],[0,1]].

// Snake snake = new Snake(width, height, food);

// Initially the snake appears at position (0,0) and the food at (1,2).

// |S| | |
// | | |F|

// snake.move("R"); -> Returns 0

// | |S| |
// | | |F|

// snake.move("D"); -> Returns 0

// | | | |
// | |S|F|

// snake.move("R"); -> Returns 1 (Snake eats the first food and right after that, the second food appears at (0,1) )

// | |F| |
// | |S|S|

// snake.move("U"); -> Returns 1

// | |F|S|
// | | |S|

// snake.move("L"); -> Returns 2 (Snake eats the second food)

// | |S|S|
// | | |S|

// snake.move("U"); -> Returns -1 (Game over because snake collides with border)

/**
 * Your SnakeGame object will be instantiated and called as such:
 * SnakeGame obj = new SnakeGame(width, height, food);
 * int param_1 = obj.move(direction);
 */

// Time:  O(s) per move, s is the current length of the snake.
// Space: O(s)

#include <Foundation/Foundation.h>

#pragma mark DeQueue

@interface DeQueue : NSObject

- (instancetype)init;
- (id)popFront;
- (id)popBack;
- (void)pushFront:(id)element;
- (void)pushBack:(id)element;
- (id)front;
-(id)back;
-(BOOL)isEmpty;
-(NSInteger)count;

@end

#pragma mark Solution

@interface SnakeGame : NSObject
@end

@implementation SnakeGame

int _width;
int _height;
int _score;
NSEnumerator* _food;
DeQueue* _snake;
NSDictionary* _direction;

 /** Initialize your data structure here.
   @param width - screen width
   @param height - screen height
   @param food - A list of food positions
   E.g food = [[1,1], [1,0]] means the first food is positioned at [1,1], the second is at [1,0]. */
-(instancetype)initWithWidth:(int)width height:(int)height food:(NSArray*)food {
  self = [super init];
  if (self) {
    _width = width;
    _height = height;
    _score = 0;
    _direction = @{@"U":@[@(-1), @0], @"L":@[@0, @(-1)], @"R":@[@0, @1], @"D":@[@1, @0]};
    _snake = [[DeQueue alloc] init];
    [_snake pushBack:@[@0, @0]];
    _food = [food objectEnumerator];
  }
  return self;
}

/** Moves the snake.
 @param direction - 'U' = Up, 'L' = Left, 'R' = Right, 'D' = Down
 @return The game's score after the move. Return -1 if game over.
 Game over when snake crosses the screen boundary or bites its body. */
-(int)moveDirection:(NSString*)direction {
  int x = [[_snake front][2] intValue] + [_direction[direction][0] intValue];
  int y = [[_snake front][1] intValue] + [_direction[direction][1] intValue];
  NSArray* tail = [_snake back];
  
  [_snake popBack];
  if (![self isValidX:x y:y]) {
    return -1;
  } else if (![[_food copy] nextObject] && [[[_food copy] nextObject][0] intValue] == x && [[[_food copy] nextObject][1] intValue] == y) {
    ++_score;
    [_food nextObject];
    [_snake pushBack:tail];
  }
  [_snake pushFront:@[@(x), @(y)]];
  return _score;
}

-(BOOL)isValidX:(int)x y:(int)y {
  if (x < 0 || x >= _height || y < 0 || y >= _width) {
    return NO;
  }
  for (NSInteger size = _snake.count; size; size--) {
    NSArray* part = [_snake popFront];
    if (x == [part[0] intValue] && y == [part[1] intValue]) {
      return NO;
    }
    [_snake pushBack:part];
  }
  return YES;
}

@end