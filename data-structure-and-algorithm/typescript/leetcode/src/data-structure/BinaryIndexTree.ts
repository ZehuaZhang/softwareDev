export class FenwickTree {
  numList: number[];
  bitList: number[];
  constructor(numList: number[]) {
    this.numList = Array(numList.length + 1).fill(0);
    this.bitList = Array(numList.length + 1).fill(0);
    for (let i = 0; i < numList.length; ++i) {
      this.update(i, numList[i]);
    }
  }

  update(i: number, value: number): void {
    const diff = value - this.numList[i + 1];
    for (let j = i + 1; j < this.bitList.length; j += this.leastBit(j)) {
      this.bitList[j] += diff;
    }
    this.numList[i + 1] = value;
  }

  sumRange(i: number, j: number): number {
    return this.getSum(j + 1) - this.getSum(i);
  }

  getSum(i: number): number {
    let result = 0;
    for (let j = i; j > 0; j -= this.leastBit(j)) {
      result += this.bitList[j];
    }
    return result;
  }

  leastBit(j: number): number {
    return j & -j;
  }
}
