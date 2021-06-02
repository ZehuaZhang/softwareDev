/**
 * find minimum in an array range, each element could be updated at any time
 */

import java.util.*;

public class SegmentTree {
   private int[] data;
   private int originalSize;

   public SegmentTree(int[] arr) {
        originalSize = arr.length;
        data = new int[2 * originalSize];

        for (int i = originalSize; i < 2 * originalSize; ++i) {
            data[i] = arr[i - originalSize];
        }

        for (int i = originalSize - 1; i >= 1; --i) {
            data[i] = Math.min(data[2 * i], data[2 * i + 1]);
        }
   }

   public void udpate(int index, int value) {
       index += originalSize;
       data[index] = value;

       for (index /= 2; index > 1; index /= 2) {
           data[index] = Math.min(data[index * 2], data[index * 2 + 1]);
       }
   }

   public int getMin(int left, int right) {
       int min = Integer.MAX_VALUE;

       for (left +=originalSize, right += originalSize; left < right; left /= 2, right /= 2) {
           if (left % 2 == 1) {
                min = Math.min(min, data[left]);
                ++left;
           } else if (right % 2 == 1) {
                --right;
                min = Math.min(min, data[right]);
           }
       }

       return min;
   }
}
