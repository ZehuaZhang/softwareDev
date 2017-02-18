// 60. Permutation Sequence
// Difficulty: Medium

// The set [1,2,3,…,n] contains a total of n! unique permutations.

// By listing and labeling all of the permutations in order,
// We get the following sequence (ie, for n = 3):

// "123"
// "132"
// "213"
// "231"
// "312"
// "321"
// Given n and k, return the kth permutation sequence.

// Time:  O(n^2)
// Space: O(n)

#import <Foundation/Foundation.h>

NSString* getPermutation(int n, int k) {
  NSMutableOrderedSet* nums = [NSMutableOrderedSet orderedSet];
  int totalFactorial = 1;
  for (int i = 1; i <= n; ++i) {
    [nums addObject:@(i)];
    totalFactorial *= i;
  }
  
  // Cantor Ordering: (n - 1)! occurances of each character of n, index = k / (n - 1)! , next k = k % (n - 1)!
  NSMutableString* permutation = @"".mutableCopy;
  for (--k; n > 0; k %= totalFactorial, --n) {
    totalFactorial /= n;
    [permutation appendFormat:@"%d", [nums[k / totalFactorial] intValue]];
    [nums removeObjectAtIndex:k / totalFactorial];
  }

  return permutation;
}

int main() {
  NSLog(@"%@", getPermutation(3, 3));
}
