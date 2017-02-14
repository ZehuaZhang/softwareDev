// 244. Shortest Word Distance II
// Difficulty : Medium

// This is a follow up of Shortest Word Distance. The only difference is now you are given the list of words
// and your method will be called repeatedly many times with different parameters. How would you optimize it?

// Design a class which receives a list of words in the constructor, and implements a method that takes two words word1
// and word2 and return the shortest distance between these two words in the list.

// For example,
// Assume that words = ["practice", "makes", "perfect", "coding", "makes"].

// Given word1 = “coding”, word2 = “practice”, return 3.
// Given word1 = "makes", word2 = "coding", return 1.

// Note:
// You may assume that word1 does not equal to word2, and word1 and word2 are both in the list.

// Time:  ctor: O(n), shortest: O(a + b), a, b is occurences of word1, word2
// Space: O(n)

#import <Foundation/Foundation.h>

@interface WordDistance : NSObject
@end

@implementation WordDistance

NSMutableDictionary* _index;

-(instancetype)initWithWords:(NSArray*)words {
  self = [super init];
  if (self) {
    _index = @{}.mutableCopy;
    for (int i = 0; i < words.count; i++) {
      if (_index[words[i]]) {
        [_index[words[i]] addObject:@(i)];
      } else {
        _index[words[i]] = @[].mutableCopy;
      }
    }
  }
  return self;
}

-(int)shortest:(NSString*)word1 word:(NSString*)word2 {
  NSArray* idx1 = _index[word1];
  NSArray* idx2 = _index[word2];
  
  int dist = INT_MAX;
  for (int i = 0, j = 0; i < [idx1 count] && j < [idx2 count];) {
    dist = MIN(dist, abs([idx1[i] intValue] - [idx2[j] intValue]));
    [idx1[i] intValue] < [idx2[j] intValue] ? ++i : ++j;
  }
  return dist;
}

@end