function selectionSort(array: number[]): void {
  for (let i = 0; i < array.length - 1; ++i) {
    let min = i;
    for (let j = i + 1; j < array.length; ++j)
      if (array[j] < array[min]) {
        min = j;
      }

    const temp = array[i];
    array[i] = array[min];
    array[min] = temp;
  }
}

function insertionSort(array: number[]): void {
  for (let i = 1; i < array.length; ++i) {
    const element = array[i];
    let j = i;
    while (j > 0 && array[j - 1] > element) {
      array[j] = array[j - 1];
      --j;
    }
    array[j] = element;
  }
}

function bubbleSort(array: number[]): void {
  for (let i = 0; i < array.length - 1; ++i) {
    for (let j = 0; j < array.length - 1 - i; ++j) {
      if (array[j] > array[j + 1]) {
        const swap = array[j];
        array[j] = array[j + 1];
        array[j + 1] = swap;
      }
    }
  }
}

function mergeSort(array: number[]): void {
  return sort(0, array.length - 1);

  function sort(left: number, right: number): void {
    if (left >= right) {
      return;
    }
    const mid = (left + right) >> 1;
    sort(left, mid);
    sort(mid + 1, right);
    const temp: number[] = [];
    for (let i = left, j = mid + 1; i <= mid; ++i) {
      for (; j <= right && array[j] < array[i]; ++j) {
        temp.push(array[j]);
      }
      temp.push(array[i]);
    }
    array.splice(left, temp.length, ...temp);
  }
}

function heapSort(array: number[]): void {
  // build heap
  for (let i = Math.trunc(array.length / 2) - 1; i >= 0; --i) {
    heapify(array.length, i);
  }

  // extract element from heap one by one
  for (let i = array.length - 1; i >= 0; --i) {
    const swap = array[0];
    array[0] = array[i];
    array[i] = swap;

    heapify(i, 0);
  }

  function heapify(length: number, i: number): void {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    // if left child is larger than root
    if (left < length && array[left] > array[largest]) {
      largest = left;
    }

    // if right child is larger than root
    if (right < length && array[right] > array[largest]) {
      largest = right;
    }

    // if largest is not root
    if (largest !== i) {
      const swap = array[i];
      array[i] = array[largest];
      array[largest] = swap;

      // heapify affected sub-tree
      heapify(length, largest);
    }
  }
}

function quickSort(array: number[]): void {
  quickSortHelper(0, array.length - 1);

  function quickSortHelper(left: number, right: number) {
    if (left > right) {
      return;
    }

    const partitionIndex = partition(left, right);

    quickSortHelper(left, partitionIndex - 1);
    quickSortHelper(partitionIndex + 1, right);
  }

  function partition(left: number, right: number) {
    const pivot = array[right];
    let i = left;
    for (let j = left; j < right; ++j) {
      if (array[j] <= pivot) {
        swap(i++, j);
      }
    }

    swap(i, right);
    return i;
  }

  function swap(i: number, j: number): void {
    const swap = array[i];
    array[i] = array[j];
    array[j] = swap;
  }
}
