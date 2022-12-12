function findTreeHeightWithEdgePairs(pairList: number[][]): number {
  const childParentMap = new Map<number, number>();
  const leafSet = new Set<number>();
  const parentSet = new Set<number>();
  pairList.forEach(([parent, child]) => {
    childParentMap.set(child, parent);
    parentSet.add(parent);
    if (leafSet.has(parent)) {
      leafSet.delete(parent);
    }
    if (!parentSet.has(child)) {
      leafSet.add(child);
    }
  });

  let result = 0;
  for (const leaf of leafSet) {
    let count = 0;
    for (let node = leaf; node; node = childParentMap.get(node)!) {
      ++count;
    }
    result = Math.max(result, count);
  }

  return result;
}
