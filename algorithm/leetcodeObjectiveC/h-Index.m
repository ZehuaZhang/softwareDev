// 274. H-Index
// Difficulty: Medium

// Given an array of citations (each citation is a non-negative integer) of a researcher,
// write a function to compute the researcher h-index.

// According to the definition of h-index on Wikipedia:
// "A scientist has index h if h of his/her N papers have at least h citations each,
// and the other N − h papers have no more than h citations each."

// For example, given citations = [3, 0, 6, 1, 5], which means the researcher has 5 papers in total and
// each of them had received 3, 0, 6, 1, 5 citations respectively.
// Since the researcher has 3 papers with at least 3 citations each and
// the remaining two with no more than 3 citations each, his h-index is 3.

// Note: If there are several possible values for h, the maximum one is taken as the h-index.

// Hint:
// An easy approach is to sort the array first.
// What are the possible values of h-index?
// A faster approach is to use extra space.

// Time:  O(n)
// Space: O(n)

#import <Foundation/Foundation.h>

// Counting sort.

int hIndex(NSArray* citations) {
  const NSInteger n = citations.count;
  int count[n + 1];
  memset(count, 0, sizeof(int) * (n + 1));
  for (id citation in citations) {
    // Put all x >= n in the same bucket.
    if ([citation intValue] >= n) {
      ++count[n];
    } else {
      ++count[[citation integerValue]];
    }
  }
  int h = 0;
  for (NSInteger i = n; i >= 0; --i) {
    h += count[i];
    if (h >= i) {
      return (int)i;
    }
  }
  return h;
}