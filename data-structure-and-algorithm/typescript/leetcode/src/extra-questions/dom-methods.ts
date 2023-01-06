let document: any;

function querySelectorAll(selector: string): any[] {
  const result: any[] = [];
  traverse(document.documentElement); // document.documentElement points root Element(the html element)
  return result;

  function isMatch(element: any, selector: string): boolean {
    return (
      element.tagName === selector.toUpperCase() ||
      element.classList.contains(selector)
    );
  }

  function traverse(node: any): void {
    if (node === null) {
      return;
    }
    if (isMatch(node, selector)) {
      result.push(node);
    }
    for (const child of node.children) {
      traverse(child);
    }
  }
}
