function findDisjointSetOfCommonElementsInPairs(n, nodes) {
  const set = Array(n).map((_, i) => i);
  for (const [src, dest] of nodes) {
    const x = find(src, set);
    const y = find(dest, set);

    if (x !== y) {
      union(x, y, set);
    }
  }

  const setList = {};
  set.forEach((s, i) => {
    if (!setList.hasOwnProperty(s)) {
      setList[s] = [];
    }
    setList[s].push(i);
  });

  const result = [];
  for (const list of Object.values(setList)) {
    result.push(list);
  }
  return result;
}

function find(x, set) {
  while (x !== set[x]) {
    x = set[x];
  }
  return x;
}

function union(x, y, set) {
  const x = find(x, set);
  const y = find(y, set);
  set[Math.min(x, y)] = Math.max(x, y);
}
