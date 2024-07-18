class PhoneDirectory {
  hasUsed: boolean[];
  numbers: number[];
  index: number;
  range: number;
  constructor(range: number) {
    this.hasUsed = Array(range).fill(false);
    this.numbers = [...Array(range)].map((_, index) => index);
    this.index = 0;
    this.range = range;
  }

  get(): number {
    if (this.index === this.range) {
      return -1;
    }

    const number = this.numbers[this.index++];
    this.hasUsed[number] = true;
    return number;
  }

  check(number: number): boolean {
    if (number < 0 || number >= this.range) {
      return false;
    }

    return !this.hasUsed[number];
  }

  release(number: number): void {
    if (number < 0 || number >= this.range || !this.hasUsed[number]) {
      return;
    }

    this.hasUsed[number] = false;
    this.numbers[--this.index] = number;
  }
}
