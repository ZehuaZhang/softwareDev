import {Nullable} from '../util/object';

export class Heap<T> {
  dataList: T[];
  dataIndexSetMap: Map<T, Set<number>>;
  compare: (data1: T, data2: T) => boolean;
  constructor(compare: (data1: T, data2: T) => number) {
    this.dataList = [];
    this.compare = (data1: T, data2: T) => compare(data1, data2) < 0;
    this.dataIndexSetMap = new Map<T, Set<number>>();
  }

  get size(): number {
    return this.dataList.length;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  has(data: T): boolean {
    return Boolean(this.dataIndexSetMap.get(data)?.size);
  }

  peek(): T {
    return this.dataList[0];
  }

  push(data: T): void {
    this.dataList.push(data);
    const i = this.dataList.length - 1;
    if (!this.dataIndexSetMap.has(data)) {
      this.dataIndexSetMap.set(data, new Set());
    }
    this.dataIndexSetMap.get(data)!.add(i);
    this.heapifyUp(i);
  }

  pop(): T {
    const data = this.dataList[0];
    this.remove(data);
    return data;
  }

  remove(data: T): void {
    const dataSet = this.dataIndexSetMap.get(data)!;
    const i = dataSet.values().next().value;
    dataSet.delete(i);
    if (this.dataList.length === 1) {
      this.dataList.pop();
      return;
    }
    const swapData = this.dataList.pop()!;
    this.dataList[i] = swapData;
    const swapSet = this.dataIndexSetMap.get(swapData)!;
    swapSet.delete(this.dataList.length);
    swapSet.add(i);
    this.heapifyUp(this.heapifyDown(i));
  }

  heapify(data: Nullable<T> = null): void {
    let i = 0;
    if (data !== null) {
      const dataSet = this.dataIndexSetMap.get(data)!;
      i = dataSet.values().next().value;
    }

    this.heapifyUp(this.heapifyDown(i));
  }

  heapifyDown(parent: number): number {
    const childList = [1, 2]
      .map(nth => parent * 2 + nth)
      .filter(child => child < this.dataList.length);
    const [child1, child2] = childList;

    const child =
      child1 &&
      child2 &&
      this.compare(this.dataList[child2], this.dataList[child1])
        ? child2
        : child1;

    if (child && this.compare(this.dataList[child], this.dataList[parent])) {
      this.swap(child, parent);
      return this.heapifyDown(child);
    }
    return parent;
  }

  heapifyUp(child: number): number {
    const parent = Math.floor((child - 1) / 2);
    if (child && this.compare(this.dataList[child], this.dataList[parent])) {
      this.swap(child, parent);
      return this.heapifyUp(parent);
    }
    return child;
  }

  swap(index1: number, index2: number): void {
    const data1 = this.dataList[index1];
    const data2 = this.dataList[index2];
    this.dataList[index1] = data2;
    this.dataList[index2] = data1;
    const dataSet1 = this.dataIndexSetMap.get(data1)!;
    const dataSet2 = this.dataIndexSetMap.get(data2)!;
    dataSet1.delete(index1);
    dataSet1.add(index2);
    dataSet2.delete(index2);
    dataSet2.add(index1);
  }
}
