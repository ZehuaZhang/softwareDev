/*
You need to construct a binary tree from a string consisting of parenthesis and integers.

The whole input represents a binary tree. It contains an integer followed by zero, one or two pairs of parenthesis. The integer represents the root's value and a pair of parenthesis contains a child binary tree with the same structure.

You always start to construct the left child node of the parent first if it exists.

Example:
Input: "4(2(3)(1))(6(5))"
Output: return the tree root node representing the following tree:

       4
     /   \
    2     6
   / \   /
  3   1 5
Note:
There will only be '(', ')', '-' and '0' ~ '9' in the input string.
An empty tree is represented by "" instead of "()".
*/

import {TreeNode} from './data-structure/BinaryTree';
import {Stack} from './data-structure/Stack';
import {Nullable} from './util/object';

function str2tree(input: string): Nullable<TreeNode> {
  if (!input.length) {
    return null;
  }
  const stack = new Stack();
  for (let i = 0; i < input.length; ++i) {
    const c = input[i];
    if (c === ')') {
      stack.pop();
    } else if (isDigit(c) || c === '-') {
      const j = i;
      for (; i + 1 < input.length && isDigit(input[i + 1]); ++i);
      const curr = new TreeNode(Number(input.substring(j, i + 1)));
      if (stack.size) {
        const node = stack.peek();
        if (!node.left) {
          node.left = curr;
        } else {
          node.right = curr;
        }
      }
      stack.push(curr);
    }
  }
  return stack.pop();

  function isDigit(char: string): boolean {
    return char >= '0' && char <= '9';
  }
}
