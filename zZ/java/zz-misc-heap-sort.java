public class Solution {
    public void heapSort(int[] arr) {

        // build heap
        for (int i = arr.length / 2 - 1; i >= 0; --i) {
            heapify(arr, n, i);
        }

        // extract element from heap one by one
        for (int i = arr.length - 1; i >= 0; --i) {
            // move current to end of the array
            int swap = arr[0];
            arr[0] = arr[i];
            arr[i] = swap;

            // heapify on reduced heap
            heapify(arr, i, 0);
        }
    }

    void heapify(int[] arr, int n, int i) {
        int largest = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;

        // if left child is larger than root
        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }

        // if right child is larger than root
        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }

        // if largest is not root
        if (largest != i) {
            int swap = arr[i];
            arr[i] = arr[largest];
            arr[largest] = swap;

            // heapify affected sub-tree
            heapify(arr, n, largest);
        }
    }
}