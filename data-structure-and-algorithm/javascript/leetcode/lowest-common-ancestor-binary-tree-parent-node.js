function lca(node1, node2) {
    const h1 = height(node1);
    const h2 = height(node2);

    if (h1 > h2) {
        lca(node2, node1);
    }

    while (node2) {
        if (h1 === h2) {
            if (node1 === node2) {
                return node1;
            }
            node1 = node1.parent;
            --h1;
        }
        node2 = node2.parent;
        --h2;
    }

    return node2;
}

function height(node) {
    let h = 0;
    while (node) {
        ++h;
        node = node.parent;
    }
    return h;
}

function lca2(node1, node2) {
    const s1 = new Set();
    while (node1) {
        s1.add(node1);
        node1 = node1.parent;
    }
    while (node2) {
        if (s1.has(node2)) {
            return node2;
        }
        node2 = node2.parent;
    }
    return node2;
}