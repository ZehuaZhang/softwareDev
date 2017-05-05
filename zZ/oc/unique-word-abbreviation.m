// 288. Unique Word Abbreviation
// Difficulty : Easy

// An abbreviation of a word follows the form <first letter><number><last letter>. Below are some examples of word abbreviations:

// a) it                      --> it    (no abbreviation)

//      1
// b) d|o|g                   --> d1g

//               1    1  1
//      1---5----0----5--8
// c) i|nternationalizatio|n  --> i18n

//               1
//      1---5----0
// d) l|ocalizatio|n          --> l10n

// Assume you have a dictionary and given a word, find whether its abbreviation is unique in the dictionary.
// A word abbreviation is unique if no other word from the dictionary has the same abbreviation.

// Example:

// Given dictionary = [ "deer", "door", "cake", "card" ]

// isUnique("dear") -> false
// isUnique("cart") -> true
// isUnique("cane") -> false
// isUnique("make") -> true

// Time:  ctor:   O(n), n is number of words in the dictionary.
//        lookup: O(1)
// Space: O(k), k is number of unique words.

// Your ValidWordAbbr object will be instantiated and called as such:
// ValidWordAbbr vwa(dictionary);
// vwa.isUnique("hello");
// vwa.isUnique("anotherWord");

#import <Foundation/Foundation.h>

@interface ValidWordAbbr : NSObject
@end

@implementation ValidWordAbbr

NSMutableDictionary* _lookup;

-(instancetype)initWithDictionary:(NSArray*)dictionary {
  self = [super init];
  for (NSString* word in dictionary) {
    NSString* abbr = [NSString stringWithFormat:@"%c%ld%c", [word characterAtIndex:0], word.length, [word characterAtIndex:word.length - 1]];
    if (!_lookup[abbr]) {
      _lookup[abbr] = @[].mutableCopy;
    }
    [_lookup[abbr] addObject:word];
  }
  return self;
}

BOOL isUnique(NSString* word) {
  NSString* abbr = [NSString stringWithFormat:@"%c%ld%c", [word characterAtIndex:0], word.length, [word characterAtIndex:word.length - 1]];
  return [_lookup[abbr] count] == [_lookup[abbr] indexesOfObjectsPassingTest:^BOOL(id  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
    return [obj isEqual:word];
  }].count;
}

@end