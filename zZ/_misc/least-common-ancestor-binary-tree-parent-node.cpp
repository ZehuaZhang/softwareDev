// Least Common Ancestor Of A Binary Tree With Parent Node

int getHeight(TreeNode* node) {
  int height = 0;
  while (node) {
    ++height;
    node = node->parent;
  }
  return height;
}

TreeNode* lca(TreeNode* node1, TreeNode* node2) {
  int h1 = getHeight(node1);
  int h2 = getHeight(node2);

  if (h1 > h2) {
    lca(node2, node1);
  }

  while (node2->parent) {
    if (node1 == node2) {
      return node1;
    }
    node2 = node2->parent;
    if (h2-- <= h1) {
      node1 = node1->parent;
    }
  }
  return node2; 
}