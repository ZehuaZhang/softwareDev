// 127. Word Ladder
// Difficulty: Medium

// Given two words (beginWord and endWord), and a dictionary word list,
// find the length of shortest transformation sequence from beginWord to endWord, such that:

// Only one letter can be changed at a time
// Each intermediate word must exist in the word list
// For example,

// Given:
// beginWord = "hit"
// endWord = "cog"
// wordList = ["hot","dot","dog","lot","log"]
// As one shortest transformation is "hit" -> "hot" -> "dot" -> "dog" -> "cog",
// return its length 5.

// Note:
// Return 0 if there is no such transformation sequence.
// All words have the same length.
// All words contain only lowercase alphabetic characters.


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

#pragma mark Solution

int ladderLength(NSString* beginWord, NSString* endWord, NSSet* wordDict) {
  NSMutableDictionary* pathLength;
  Queue* queue = [[Queue alloc] init];
  [pathLength setObject:@1 forKey:beginWord];
  [queue push:beginWord];
  
  while (![queue isEmpty]) {
    NSString* word = [queue pop];
    for (int i = 0; i < [word length]; ++i) {
      NSMutableString* newWord = [word mutableCopy];
      for (char ch = 'a'; ch <= 'z'; ++ch) {
        [newWord replaceCharactersInRange:NSMakeRange(i, 1) withString:[NSString stringWithFormat:@"%c", ch]];
        if (newWord == endWord) {
          return [[pathLength objectForKey:word] intValue] + 1;
        }
        if ([wordDict containsObject:newWord] && ![pathLength objectForKey:newWord]) {
          [queue push:newWord];
          [pathLength setObject:@([[pathLength objectForKey:word] intValue] + 1)  forKey:newWord];
        }
      }
    }
  }
  return 0;
}