function preorderTraversal(root) {
  const stack = [];
  if (root) {
    stack.push(root);
  }

  const result = [];
  while (stack.length) {
    const node = stack.pop();
    result.push(node.val);

    if (node.right) {
      result.push(node.right);
    }

    if (node.left) {
      result.push(node.left);
    }
  }

  return result;
}

function inorderTraversal(root) {
  const stack = [];
  const result = [];
  const node = root;

  while (stack.length || node) {
    if (node) {
      stack.push(node);
      node = node.left;
    } else {
      node = stack.pop();
      result.push(node.val);
      node = node.right;
    }
  }

  return result;
}

function postorderTraversal(root) {
  const stack = [];
  const result = [];
  let node = root;

  while (stack.length || node) {
    if (node) {
      stack.push(node);
      result.push(node.val);
      node = node.right;
    } else {
      node = stack.pop().left;
    }
  }
  return result.reverse();
}

function inorderMorris(root) {
  const result = [];
  if (!root) {
    return result;
  }

  for (let curr = root; curr; ) {
    if (curr.left) {
      let node = curr.left;
      for (; node.right && node.right != curr; node = node.right);
      if (node.right) {
        node.right = null;
        result.push(curr.val);
        curr = curr.right;
      } else {
        node.right = curr;
        curr = curr.left;
      }
    } else {
      result.push(curr.val);
      curr = curr.right;
    }
  }
  return result;
}

function preorderMorris(root) {
  const result = [];
  if (!root) {
    return result;
  }
  for (let curr = root; curr; ) {
    if (curr.left) {
      let node = curr.left;
      for (; node.right != null && node.right != curr; node = node.right);
      if (node.right) {
        node.right = null;
        curr = curr.right;
      } else {
        node.right = curr;
        result.add(curr.val);
        curr = curr.left;
      }
    } else {
      result.add(curr.val);
      curr = curr.right;
    }
  }
  return result;
}

function postorderMorris(root) {
  const result = [];
  if (!root) {
    return result;
  }
  for (let curr = root; curr; ) {
    if (curr.right) {
      let node = curr.right;
      for (; node.left && node.left != curr; node = node.left);
      if (node.left) {
        node.left = null;
        curr = curr.left;
      } else {
        node.left = curr;
        result.addFirst(curr.val);
        curr = curr.right;
      }
    } else {
      result.push(curr.val);
      curr = curr.left;
    }
  }
  return result.reverse();
}
