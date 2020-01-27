function selectionSort(array) {
    for (let i = 0; i < array.length - 1; ++i) {
        let min = i
        for (let j = i + 1; j < array.length; ++j)
            if (array[j] < array[min]) {
                min = j
            }

        const temp = array[i]
        array[i] = array[min]
        array[min] = temp
    }
}

function insertionSort(array) {
    for (let i = 1; i < array.length; ++i) {
        const element = array[i]
        let j = i
        while (j > 0 && array[j - 1] > element) {
            array[j] = array[j - 1]
            --j
        }
        array[j] = element
    }
}

function bubbleSort(array) {
    for (let i = 0; i < array.length - 1; ++i) {
        for (let j = 0; j < array.length - 1 - i; ++j) {
            if (array[j] > array[j + 1]) {
                const swap = array[j]
                array[j] = array[j + 1]
                array[j + 1] = swap
            }
        }
    }
}

function mergeSort(array) {

    function mergeSortHelper(array, leftIndex, rightIndex) {
        if (leftIndex > rightIndex) {
            return
        }
    
        const middleIndex = leftIndex + (rightIndex - leftIndex) / 2
    
        mergeSort(array, leftIndex, middleIndex)
        mergeSort(array, middleIndex + 1, rightIndex)
    
        merge(array, leftIndex, middleIndex, rightIndex)
    }
    
    function merge(array, leftIndex, middleIndex, rightIndex) {
        const leftArrayLength = middleIndex - leftIndex + 1
        const rightArrayLength = rightIndex - middleIndex + 1
    
        const leftArray = []
        const rightArray = []
    
        for (let i = 0; i < leftArrayLength; ++i) {
            leftArray[i] = array[leftIndex + i]
        }
        for (let i = 0; i < rightArrayLength; ++i) {
            rightArray[j] = array[middleIndex + 1 + i]
        }
    
        let mergeIndex = left, i = 0, j = 0
        while (i < leftArrayLength && j < rightArrayLength) {
            if (leftArray[i] <= rightArray[j]) {
                array[mergeIndex++] = leftArray[i++]
            } else {
                array[mergeIndex++] = rightArray[j++]
            }
        }
    
        while (i < leftArrayLength) {
            arr[mergeIndex++] = leftArray[i++]
        }
        while (j < rightArrayLength) {
            arr[mergeIndex++] = rightArray[j++]
        }
    }

    mergeSortHelper(array, 0, array.length - 1)
}

function heapSort(array) {

    function heapify(array, n, i) {
        let largest = i
        const left = 2 * i + 1
        const right = 2 * i + 2
    
        // if left child is larger than root
        if (left < n && arr[left] > arr[largest]) {
            largest = left
        }
    
        // if right child is larger than root
        if (right < n && arr[right] > arr[largest]) {
            largest = right
        }
    
        // if largest is not root
        if (largest != i) {
            const swap = array[i]
            array[i] = array[largest]
            array[largest] = swap
    
            // heapify affected sub-tree
            heapify(array, n, largest)
        }
    }

    // build heap
    for (let i = Math.trunc(array.length / 2) - 1; i >= 0; --i) {
        heapify(array, array.length, i)
    }

    // extract element from heap one by one
    for (let i = array.length - 1; i >= 0; --i) {
        const swap = array[0]
        array[0] = array[i]
        array[i] = swap

        heapify(array, i, 0)
    }
}

function quickSort(array) {

    function quickSortHelper(array, leftIndex, rightIndex) {
        if (leftIndex > rightIndex) {
            return
        }
    
        const partitionIndex = partition(array, leftIndex, rightIndex)
    
        quickSortHelper(array, leftIndex, partitionIndex - 1)
        quickSortHelper(array, partitionIndex + 1, rightIndex)
    }
    
    function partition(array, leftIndex, rightIndex) {
        const pivot = array[rightIndex]
        let i = leftIndex
        for (let j = leftIndex; j < rightIndex; ++j) {
            if (array[j] <= pivot) {
                swap(array, i++, j)
            }
        }
    
        swap(array, i, rightIndex)
        return i
    }
    
    function swap(array, i, j) {
        const swap = array[i]
        array[i] = array[j]
        array[j] = swap
    }

    quickSortHelper(array, 0, array.length - 1)
}