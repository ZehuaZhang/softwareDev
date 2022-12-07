function findNodesWithZeroAndOneParent(pairList) {
  pairList.forEach(pair => {
    const [parent, child] = pair;
    const inDegree = {};
    const outDegree = {};
    inDegree[child] = (inDegree[child] || 0) + 1;
    outDegree[parent] = (outDegree[parent] || 0) + 1;
  });

  const roots = new Set();
  const leaves = new Set();
  for (const key of Object.keys(inDegree)) {
    if (inDegree[key] === 0) {
      roots.add(key);
    }
    if (inDegree[key] === 1) {
      leaves.add(key);
    }
  }

  for (const leaf of leaves) {
    if (outDegree[leaf]) {
      leaves.delete(leaf);
    }
  }

  return [...roots, ...leaves];
}
