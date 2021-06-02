// 211. Add and Search Word - Data structure design
// Difficulty: Medium

// Design a data structure that supports the following two operations:

// void addWord(word)
// bool search(word)
// search(word) can search a literal word or a regular expression string containing only letters a-z or .
// . means it can represent any one letter.

// Your WordDictionary object will be instantiated and called as such:
// WordDictionary wordDictionary;
// wordDictionary.addWord("word");
// wordDictionary.search("pattern");

// For example:

// addWord("bad")
// addWord("dad")
// addWord("mad")
// search("pad") -> false
// search("bad") -> true
// search(".ad") -> true
// search("b..") -> true
// Note:
// You may assume that all words are consist of lowercase letters a-z.

// Hint:
// You should be familiar with how a Trie works. If not, please work on this problem: Implement Trie (Prefix Tree) first.

// Time:  O(min(n, h)), per operation
// Space: O(min(n, h))

#import <Foundation/Foundation.h>

#pragma mark TrieNode

@interface TrieNode : NSObject

-(instancetype)init;

@property (atomic, assign) BOOL isString;
@property (atomic, strong) NSMutableDictionary* leaves;

@end

#pragma mark WordDictionary

@interface WordDictionary : NSObject

-(instancetype)init;
-(void)addWord:(NSString*)word;
-(BOOL)search:(NSString*)word;

@end

@implementation WordDictionary

TrieNode* root;

-(instancetype)init {
  self = [super init];
  if (self) {
    root = [[TrieNode alloc] init];
  }
  return self;
}
  
// Adds a word into the data structure.
-(void)addWord:(NSString*)word {
  TrieNode* curr = root;
  for (int i = 0; i < word.length; i++) {
    char c = [word characterAtIndex:i];
    if (!curr.leaves[@(c)]) {
      curr.leaves[@(c)] = [[TrieNode alloc] init];
    }
    curr = curr.leaves[@(c)];
  }
  curr.isString = YES;
}

// Returns if the word is in the data structure. A word could
// contain the dot character '.' to represent any one letter.
-(BOOL)search:(NSString*)word {
  return [self searchWord:word fromNode:root atIndex:0];
}

-(BOOL)searchWord:(NSString*)word fromNode:(TrieNode*)node atIndex:(int)index {
  if (index == word.length) {
    return node.isString;
  }
  
  char c = [word characterAtIndex:index];
  if (node.leaves[@(c)]) {
    return [self searchWord:word fromNode:node.leaves[@(c)] atIndex:index + 1];
  } else if (c == '.') {
    for (id cStr in node.leaves) {
      if ([self searchWord:word fromNode:node.leaves[cStr] atIndex:index + 1]) {
        return YES;
      }
    }
  }
  return NO;
}

@end
