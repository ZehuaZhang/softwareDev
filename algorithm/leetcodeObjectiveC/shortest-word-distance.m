// 243. Shortest Word Distance
// Difficulty: Easy

// Given a list of words and two words word1 and word2, return the shortest distance between these two words in the list.

// For example,
// Assume that words = ["practice", "makes", "perfect", "coding", "makes"].

// Given word1 = "coding", word2 = "practice", return 3.
// Given word1 = "makes", word2 = "coding", return 1.

// Note:
// You may assume that word1 does not equal to word2, and word1 and word2 are both in the list.

// Time:  O(n)
// Space: O(1)

#import <Foundation/Foundation.h>

int shortestDistance(NSArray* words, NSString* word1, NSString* word2) {
  int dist = INT_MAX;
  for (int i = 0, index1 = -1, index2 = -1; i < [words count]; ++i) {
    if ([words[i] isEqual:word1]) {
      index1 = i;
    } else if ([words[i] isEqual:word2]) {
      index2 = i;
    }
    if (index1 != -1 && index2 != -1) {
      dist = MIN(dist, abs(index1 - index2));
    }
  }
  return dist;
}