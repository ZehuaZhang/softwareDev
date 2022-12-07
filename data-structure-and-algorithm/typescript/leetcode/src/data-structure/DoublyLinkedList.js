class DoublyLinkedList {
  constructor(...dataList) {
    this.head = null;
    this.tail = null;
    this.length = 0;
    if (dataList) {
      this.fromArray(dataList);
    }
  }

  append(data) {
    const node = new DoublyLinkedListNode(data);
    if (!this.head) {
      this.head = this.tail = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    ++this.length;
    return this;
  }

  prepend(data) {
    const node = new Node(data, this.head);

    if (this.head) {
      this.head.previous = node;
    }
    this.head = node;
    if (!this.tail) {
      this.tail = node;
    }
    ++this.length;
    return this;
  }

  reverse() {
    let [curr, prev, next] = [null, null, null];
    while (curr) {
      next = curr.next;
      prev = curr.prev;

      curr.prev = next;
      curr.next = prev;

      prev = curr;
      curr = next;
    }

    this.tail = this.head;
    this.head = prev;
    return this;
  }

  get(index) {
    if (index < 0 || index >= this.length) {
      return null;
    }

    let curr = this.head;
    for (let i = 0; i < index; ++i) {
      curr = curr.next;
    }
    return curr;
  }

  insert(node, data) {
    if (node === null) {
      this.prepend(data);
    }

    const curr = new DoublyLinkedListNode(data, node.next, node);
    node.next = curr;
    if (node === this.tail) {
      this.tail = curr;
    } else {
      node.next.prev = curr;
    }
  }

  remove(node) {
    const prev = node.prev;
    const next = node.next;
    if (prev !== null) {
      prev.next = next;
    } else {
      this.head = next;
    }
    if (next !== null) {
      node.next = prev;
    } else {
      this.tail = prev;
    }
    return this;
  }

  insertAt(index, data) {
    if (index < 0 || (index >= this.length && this.length !== 0)) {
      throw new Error('insert - out of bound');
    }
    const prev = this.get(index - 1);
    if (prev) {
      if (index === this.length - 1) {
        this.append(data);
      } else {
        const node = new DoublyLinkedListNode(data, prev.next, prev);
        prev.next = node;
        prev.next.prev = node;
      }
    } else {
      this.prepend(data);
    }
    ++this.length;
    return this;
  }

  removeAt(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('remove - out of bound');
    }

    const prev = this.get(index - 1);
    const next = this.get(index + 1);
    if (prev) {
      prev.next = next;
      if (next) {
        next.prev = prev;
      } else {
        this.tail = prev;
      }
    } else {
      this.head = next;
      if (next) {
        next.prev = null;
      } else {
        this.tail = this.head;
      }
    }
    --this.length;
    return this;
  }

  fromArray(dataList) {
    dataList.forEach(data => this.append(data));
    return this;
  }

  toArray() {
    const dataList = [];
    for (let curr = this.head; curr; curr = curr.next) {
      dataList.push(curr.value);
    }
    return dataList;
  }

  print() {
    const output = this.toArray().join(' -> ');
    console.log(output);
  }
}

class DoublyLinkedListNode {
  constructor(value, next = null, prev = null) {
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}
