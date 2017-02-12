// 208. Implement Trie (Prefix Tree)
// Difficulty: Medium

// Implement a trie with insert, search, and startsWith methods.

// Note:
// You may assume that all inputs are consist of lowercase letters a-z.

// Time:  O(n), per operation
// Space: O(1)

#import <Foundation/Foundation.h>

#pragma mark TrieNode

@interface TrieNode : NSObject

-(instancetype)init;

@property (atomic, assign) BOOL isString;
@property (atomic, strong) NSMutableDictionary* leaves;

@end

@implementation TrieNode

-(instancetype)init {
  self = [super init];
  if (self) {
    self.isString = false;
    self.leaves = @{}.mutableCopy;
  }
  return self;
}

@end

#pragma mark Trie

@interface Trie : NSObject

-(instancetype)init;
-(void)insert:(NSString*)word;
-(BOOL)search:(NSString*)word;
-(BOOL)startsWith:(NSString*)prefix;

@end

@implementation Trie

TrieNode* root;

-(instancetype)init {
  self = [super init];
  if (self) {
    root = [[TrieNode alloc] init];
  }
  return self;
}

// Inserts a word into the trie.
-(void)insert:(NSString*)word {
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

// Returns if the word is in the trie.
-(BOOL)search:(NSString*)word {
  TrieNode* node = [self childSearch:word];
  if (node) {
    return node.isString;
  }
  return NO;
}

// Returns if there is any word in the trie
// that starts with the given prefix.
-(BOOL)startsWith:(NSString*)prefix {
  return [self childSearch:prefix] != nil;
}

// return last character of word in Trie
-(TrieNode*)childSearch:(NSString*)word {
  TrieNode* curr = root;
  for (int i = 0; i < word.length; i++) {
    char c = [word characterAtIndex:i];
    if (curr.leaves[@(c)]) {
      curr = curr.leaves[@(c)];
    } else {
      return nil;
    }
  }
  return curr;
}

@end

// Your Trie object will be instantiated and called as such:
// Trie trie;
// trie.insert("somestring");
// trie.search("key");
