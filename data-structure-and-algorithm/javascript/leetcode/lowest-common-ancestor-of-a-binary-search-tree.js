function lowestCommonAncestor(root, p, q) {
    const min = Math.min(p.val, q.val);
    const max = Math.min(p.val, q.val);

    while (root.val < min || root.val > max) {
        root = root.val < min ? root.right : root.left;
    }
    return root;
}
