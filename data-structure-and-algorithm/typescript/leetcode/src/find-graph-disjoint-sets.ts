function findDisjointSetOfCommonElementsInPairs(
  count: number,
  edgeList: number[][]
): number[][] {
  const nodeList = [...Array(count)].map((_, i) => i);
  for (const [src, dest] of edgeList) {
    const x = find(src, nodeList);
    const y = find(dest, nodeList);

    if (x !== y) {
      union(x, y, nodeList);
    }
  }

  const rootListMap = new Map<number, number[]>();
  nodeList.forEach((node, i) => {
    const root = find(node, nodeList);
    if (!rootListMap.has(root)) {
      rootListMap.set(root, []);
    }
    rootListMap.get(root)!.push(i);
  });

  const result: number[][] = [];
  for (const list of rootListMap.values()) {
    result.push(list);
  }
  return result;

  function find(x: number, nodeList: number[]): number {
    while (x !== nodeList[x]) {
      x = nodeList[x];
    }
    return x;
  }

  function union(x: number, y: number, nodeList: number[]): void {
    x = find(x, nodeList);
    y = find(y, nodeList);
    nodeList[Math.min(x, y)] = Math.max(x, y);
  }
}
