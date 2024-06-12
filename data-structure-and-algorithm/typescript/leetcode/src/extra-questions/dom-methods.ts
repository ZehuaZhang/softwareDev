let document: any;

function querySelectorAll(selector: string): any[] {
  const result: any[] = [];
  traverse(document.documentElement); // document.documentElement points root Element(the html element)
  return result;

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

  function isMatch(element: any, selector: string): boolean {
    const qry = selector.split(/[^a-zA-Z0-9-]/).filter(Boolean)[0];

    if (selector.startsWith('.')) {
      return element.classList.contains(qry);
    }

    if (selector.startsWith('#')) {
      return element.getAttribute('id') === qry;
    }

    return element.tagName === qry.toUpperCase();
  }
}
