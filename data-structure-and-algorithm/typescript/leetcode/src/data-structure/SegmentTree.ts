export class SegmentTree {
  minList: number[];
  maxList: number[];
  size: number;
  height: number;
  constructor(numList: number[]) {
    const {length} = numList;
    this.height = 2 ** Math.ceil(Math.log2(length));
    this.size = 2 * this.height;
    this.minList = Array(this.size).fill(Infinity);
    this.maxList = Array(this.size).fill(-Infinity);
    for (let i = 0; i < length; i++) {
      this.minList[this.height + i] = numList[i];
      this.maxList[this.height + i] = numList[i];
    }
    for (let i = this.height - 1; i >= 1; --i) {
      this.propagate(i);
    }
  }

  update(idx: number, value: number): void {
    this.minList[this.height + idx] = value;
    this.maxList[this.height + idx] = value;
    for (let i = this.parent(this.height + idx); i >= 1; i = this.parent(i)) {
      this.propagate(i);
    }
  }

  propagate(i: number): void {
    this.minList[i] = Math.min(
      this.minList[this.left(i)],
      this.minList[this.right(i)]
    );
    this.maxList[i] = Math.max(
      this.maxList[this.left(i)],
      this.maxList[this.right(i)]
    );
  }

  min(i: number, j: number): number {
    let min = Infinity;
    for (
      let [x, y] = [i + this.height, j + this.height];
      x < y;
      x = this.parent(x), y = this.parent(y)
    ) {
      if (x & 1) {
        min = Math.min(min, this.minList[x++]);
      }
      if (y & 1) {
        min = Math.min(min, this.minList[--y]);
      }
    }
    return min;
  }

  max(i: number, j: number): number {
    let max = -Infinity;
    for (
      let [x, y] = [i + this.height, j + this.height];
      x < y;
      x = this.parent(x), y = this.parent(y)
    ) {
      if (x & 1) {
        max = Math.max(max, this.maxList[x++]);
      }
      if (y & 1) {
        max = Math.max(max, this.maxList[--y]);
      }
    }
    return max;
  }

  indexOf(i: number, value: number): number {
    if (i >= this.height) {
      return -1;
    }

    for (let node = this.height + i; ; ) {
      if (this.minList[node] <= value) {
        if (node >= this.height) {
          return node - this.height;
        }
        node = this.left(node);
      } else {
        ++node;
        if ((node & (node - 1)) === 0) {
          return -1;
        }
        if (node % 2 === 0) {
          node = this.parent(node);
        }
      }
    }
  }

  parent(i: number): number {
    return i >> 1;
  }

  left(i: number): number {
    return 2 * i;
  }

  right(i: number): number {
    return 2 * i + 1;
  }

  minTree(): number[] {
    return this.minList;
  }

  maxTree(): number[] {
    return this.maxList;
  }
}
