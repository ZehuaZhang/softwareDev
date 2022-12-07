class BinarySearchTreeNode {
  constructor(data) {
    this.data = data;
    this.right = null;
    this.left = null;
  }

  add(node) {
    if (node.data > this.data) {
      if (this.right === null) {
        this.right = node;
      } else {
        this.right.add(node);
      }
    } else if (node.data < this.data) {
      if (this.left === null) {
        this.left = node;
      } else {
        this.left.add(node);
      }
    }
  }

  toArray() {
    const array = [];
    dfs(this, array);
    return array;

    function dfs(node, array) {
      if (node === null) {
        return;
      }
      array.push(node);
      dfs(node.left);
      dfs(node.right);
    }
  }

  has(data) {
    if (this.data === data) {
      return true;
    }
    if (this.data > data) {
      return this.left ? this.left.has(data) : false;
    }
    return this.right ? this.right.has(data) : false;
  }

  remove(data) {
    if (this.data === data) {
      if (!this.right && !this.left) {
        return null;
      }
      if (!this.right || !this.left) {
        return this.left ? this.left : this.right;
      }
      this.data = this.left.max().data;
      this.left.remove(this.data);
    } else if (this.data > data) {
      this.left = this.left ? this.left.remove(data) : null;
    } else {
      this.right = this.right ? this.right.remove(data) : null;
    }
    return this;
  }

  max() {
    let curr = this;
    for (; curr.right; curr = curr.right);
    return curr;
  }
}
