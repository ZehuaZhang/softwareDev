/**
Given a list of string array,
In each string array, the first element consists of the rest elements.
e.g.
[Earth, South America, North America, Asia, Pacific, Africa]
[Asia, China, Korea, Japan]
[North America, USA, Canada]
[South America, Brazil, Columbia]
[Africa, Algeria, Lybia]
[China, Beijing, Shanhai]
[Japan, Tokyo, Kyoto]
[Korea, Seoul]

Given two valid elements, find its least common ancestor (LCA)
e.g.
input
[Tokyo, Kyoto]
output
Japan

input
[Beijing, Japan]
output
Asia

input
[Seoul, Africa]
output
Earth
*/

function findLowestCommonTerritory(
  territoryCollection: string[][],
  inputList: string[]
): string {
  const childParentMap = new Map<string, string>();
  territoryCollection.forEach(([parent, ...childList]) => {
    childList.forEach(child => {
      childParentMap.set(child, parent);
    });
  });

  return lca(childParentMap, inputList[0], inputList[1]);

  function lca(
    childParentMap: Map<string, string>,
    node1: string,
    node2: string
  ): string {
    const ancestors = new Set<string>();
    while (node1) {
      ancestors.add(node1);
      node1 = childParentMap.get(node1)!;
    }

    while (node2 && !ancestors.has(node2)) {
      node2 = childParentMap.get(node2)!;
    }
    return node2;
  }
}
