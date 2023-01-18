export class BinaryIndexTree {
  numList: number[];
  bitList: number[];
  constructor(numList: number[]) {
    const {length} = numList;
    this.numList = Array(length + 1).fill(0);
    this.bitList = Array(length + 1).fill(0);
    for (let i = 0; i < length; ++i) {
      this.update(i, numList[i]);
    }
  }

  update(i: number, data: number): void {
    const diff = data - this.numList[i + 1];
    this.updateDelta(i, diff);
  }

  updateDelta(i: number, delta: number): void {
    for (let j = i + 1; j < this.bitList.length; j += this.leastBit(j)) {
      this.bitList[j] += delta;
    }
    this.numList[i + 1] += delta;
  }

  sumRange(i: number, j: number): number {
    return this.getSum(j) - this.getSum(i - 1);
  }

  getSum(i: number): number {
    let result = 0;
    for (let j = i + 1; j > 0; j -= this.leastBit(j)) {
      result += this.bitList[j];
    }
    return result;
  }

  leastBit(j: number): number {
    return j & -j;
  }
}
