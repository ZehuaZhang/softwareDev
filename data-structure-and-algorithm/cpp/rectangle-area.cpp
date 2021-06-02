// 223. Rectangle Area
// Difficulty: Easy

// Find the total area covered by two rectilinear rectangles in a 2D plane.

// rectangle1 (A, B) left-bottom <=> (C, D) right-top
// rectangle2 (E, F) left-bottom <=> (G, H) right-top

// Each rectangle is defined by its bottom left corner and top right corner as shown in the figure.

// Rectangle Area
// Assume that the total area is never beyond the maximum possible value of int.

// Time:  O(1)
// Space: O(1)

class Solution {
public:
  int computeArea(int A, int B, int C, int D, int E, int F, int G, int H) {
    return (D - B) * (C - A) + (G - E) * (H - F) -
    max(0, min(C, G) - max(A, E)) * max(0, min(D, H) - max(B, F));
  }
};
