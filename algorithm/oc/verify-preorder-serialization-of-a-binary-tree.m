// 331. Verify Preorder Serialization of a Binary Tree
// Difficulty: Medium

// One way to serialize a binary tree is to use pre-order traversal. When we encounter a non-null node, we record the node value.
// If it is a null node, we record using a sentinel value such as #.

//      _9_
//     /   \
//    3     2
//   / \   / \
//  4   1  #  6
// / \ / \   / \
// # # # #   # #
// For example, the above binary tree can be serialized to the string "9,3,4,#,#,1,#,#,2,#,6,#,#", where # represents a null node.

// Given a string of comma separated values, verify whether it is a correct preorder traversal serialization of a binary tree.
// Find an algorithm without reconstructing the tree.

// Each comma separated value in the string must be either an integer or a character '#' representing null pointer.

// You may assume that the input format is always valid, for example it could never contain two consecutive commas such as "1,,3".

// Example 1:
// "9,3,4,#,#,1,#,#,2,#,6,#,#"
// Return true

// Example 2:
// "1,#"
// Return false

// Example 3:
// "9,#,#,1"
// Return false

// Time:  O(n)
// Space: O(1)

#import <Foundation/Foundation.h>

BOOL isValidSerialization(NSString* preorder) {
  if (!preorder.length) {
    return NO;
  }
  NSArray* tokens = [preorder componentsSeparatedByString:@","];
  
  int parents = 0;
  for (int i = 0; i < tokens.count - 1; ++i) {
    // for full tree, leaves are always one more than its parent nodes
    if ([tokens[i] isEqual:@"#"]) {
      if (parents-- == 0) {   // preorder, root is before leaf
        return false;
      }
    } else {
      ++parents;
    }
  }
  // by this point - one leaf left, parents count should match to leaves
  return parents == 0 && [[tokens lastObject] isEqual:@"#"];   // last one must be "#", leaf
}