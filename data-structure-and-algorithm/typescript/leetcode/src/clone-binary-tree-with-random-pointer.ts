function copyRandomBinaryTree(root) {
  const map = new Map();
  return dfs(root);
}

function dfs(node) {
  if (node === null) {
    return null;
  }
  if (map.has(node)) {
    return map.get(node);
  }
  const copy = new Node(node.val);
  map.set(node, copy);
  copy.left = dfs(node.left);
  copy.right = dfs(node.right);
  copy.random = dfs(node.random);
  return copy;
}
