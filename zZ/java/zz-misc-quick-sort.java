public class Solution {
    public void quickSort(int[] arr) {
        quickSort(arr, 0, arr.length);
    }

    public void quickSort(int[] arr, int left, int right) {
        if (left > right) {
            return;
        }

        int indexOfPartition = partition(arr, left, right);

        quickSort(arr, left, indexOfPartition - 1);
        quickSort(arr, indexOfPartition + 1, right);
    }

    public int partition(int[] arr, int left, int right) {
        int pivot = arr[right];
        int i = left;
        for (int j = left; j < right; ++j) {
            if (arr[j] <= pivot) {
                swap(arr, i++, j);
            }
        }

        swap(arr, i, right);
        return i;
    }

    void swap(int[] arr, int i, int j) {
        int swap = arr[i];
        arr[i] = arr[j];
        arr[j] = swap;
    }
}