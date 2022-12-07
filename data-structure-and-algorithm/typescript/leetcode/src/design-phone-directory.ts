class PhoneDirectory {
  constructor(max) {
    this.hasUsed = Array(max).fill(false);
    this.numbers = this.hasUsed.map((used, index) => index);
    this.index = 0;
    this.max = max;
  }

  get() {
    if (this.index === this.max) {
      return -1;
    }

    const number = this.numbers[this.index++];
    this.hasUsed[number] = true;
    return number;
  }

  check(number) {
    if (number < 0 || number >= this.max) {
      return false;
    }

    return !this.hasUsed[number];
  }

  release(number) {
    if (number < 0 || number >= this.max || !this.hasUsed[number]) {
      return;
    }

    this.hasUsed[number] = false;
    this.numbers[--this.index] = number;
  }
}
