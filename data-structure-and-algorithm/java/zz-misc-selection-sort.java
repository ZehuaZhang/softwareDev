public class Solution {
    public void selectionSort(int[] arr) {
        for (int i = 0; i < arr.length - 1; ++i) {
           int indexOfMin = i;
           for (int j = i + 1; j < n; ++j) {
               if (arr[j] < arr[indexOfMin]) {
                   indexOfMin = j;
               }
           }

           int swap = arr[indexOfMin];
           arr[indexOfMin] = arr[i];
           arr[i] = swap;
        }
    }
}