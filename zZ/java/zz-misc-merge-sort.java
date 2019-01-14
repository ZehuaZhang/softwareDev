public class Solution {
    public void mergeSort(int[] arr) {
        mergeSort(arr, 0, arr.length);
    }

    public void mergeSort(int[] arr, int left, int right) {
        if (left > right) {
            return;
        }

        int middle = left + (right - left) / 2;

        mergeSort(arr, left, middle);
        mergeSort(arr, middle + 1, right);

        merge(arr, left, middle, right);
    }

    public void merge(int[] arr, int left, int middle, int right) {
        int leftArrayLength = middle - left + 1;
        int rightArrayLength = right - middle;
        
        // cache left and right subarray
        int[] leftArray = new int[leftArrayLength];
        int[] rightArray = new int[rightArrayLength];

        for (int i = 0; i < leftArrayLength; ++i) {
            leftArray[i] = arr[left + i];
        }
        for (int i = 0; i < rightArrayLength; ++i) {
            rightArray[j] = arr[middle + 1 + j];
        }

        // merge
        int indexOfLeft = 0, indexOfRight = 0, indexOfMerge = left;
        while (indexOfLeft < leftArrayLength && indexOfRight < rightArrayLength) {
            if (leftArray[i] <= rightArray[j]) {
                arr[indexOfMerge++] = leftArray[indexOfLeft++]; 
            } else {
                arr[indexOfMerge++] = rightArray[indexOfRight++];
            }
        }

        // merge the remaing if any
        while (indexOfLeft < leftArrayLength) {
            arr[indexOfMerge++] = leftArray[indexOfLeft++];
        }
        while (indexOfRight < rightArrayLength) {
            arr[indexOfMerge++] = rightArray[indexOfRight++];
        }
    }
}