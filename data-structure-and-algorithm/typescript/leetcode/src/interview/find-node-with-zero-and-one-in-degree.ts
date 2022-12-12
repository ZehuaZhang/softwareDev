function findNodesWithZeroAndOneParent(pairList: number[][]): number[][] {
  const inDegreeMap = new Map<number, number>();

  pairList.forEach(pair => {
    const [parent, child] = pair;
    inDegreeMap.set(child, (inDegreeMap.get(child) || 0) + 1);
    inDegreeMap.set(parent, inDegreeMap.get(parent) || 0);
  });

  const zeroParentNodeList: number[] = [];
  const oneParentNodeList: number[] = [];
  for (const [node, inDegree] of inDegreeMap.entries()) {
    if (inDegree === 0) {
      zeroParentNodeList.push(node);
    }
    if (inDegree === 1) {
      oneParentNodeList.push(node);
    }
  }

  return [zeroParentNodeList, oneParentNodeList];
}
