function inorderSuccessorIterative(root, node) {
    let succ = null;
    for (let curr = root; curr;) {
        if (curr.val > node.val) {
            succ = curr;
            curr = curr.left;
        } else {
            curr = curr.right;
        }
    }
    return succ;
}

function inorderPredecessorIterative(root, node) {
    let pred = null;
    for (let curr = root; curr;) {
        if (curr.val >= node.val) {
            curr = curr.left;
        } else {
            pred = curr;
            curr = curr.right;
        }
    }
    return pred;
}

function inorderSuccessorRecursive(root, node) {
    if (!root) {
        return null;
    }
    if (root.val > node.val) {
        let succ = inorderSuccessorRecursive(root.left, node);
        return succ ? succ : root;
    }
    return inorderSuccessorRecursive(root.right, node);
}

function inorderPredecessorRecursive(root, node) {
    if (!root) {
        return null;
    }
    if (root.val >= node.val) {
        return inorderPredecessorRecursive(root.left, node);
    }
    let pred = inorderPredecessorRecursive(root.right, node);
    return pred ? pred : root;
}

function inorderSuccessorParent(node) {
    if (node.right !== null) {
        for (node = node.right; node.left; node = node.left);
        return node;
    }
    for (; node.parent && node === node.parent.right; node = node.parent);
    return node.parent;
}

function inorderPredecessorParent(node) {
    if (node.left !== null) {
        for (node = node.left; node.right; node = node.right);
        return node;
    }
    for (; node.parent && node === node.parent.left; node = node.parent);
    return node.parent;
}