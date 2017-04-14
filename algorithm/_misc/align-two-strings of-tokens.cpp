// Align Two Strings of Tokens

struct Tokens {
  string word;
  int start;
  int end;
};

class Solution {
public:
  vector<vector<vector<string>>> align(vector<Tokens>seq1, vector<Tokens>seq2) {
    auto compare = [](const Token& a, const Token& b) {
      return a.start < b.start;
    };
    sort(seq1.begin(), seq1.end(), compare);
    sort(seq2.begin(), seq2.end(), compare);
    vector<vector<vector<string>>> result;
    int i = 0, j = 0;
    for (; i < seq1.size() || j < seq2.size();) {
      if (seq1[i].start < seq2[j].start) {
        result.push_back({{seq[i++].word}});
      } else if (seq1[i].start > seq2[j].start) {
        result.push_back({{seq[j++].word}});
      } else {
        int i0 = i, j0 = j;
        while (i < seq1.size() && j < seq2.size() && seq1[i].end != seq2[j].end) {
          if (seq1[i].end < seq2[j].end) {
            if (i + 1 == seq1.size() || seq1[i + 1].start > seq1[i].end + 1) {
              break;
            } else {
              ++i;
            }
          } else if (seq1[i].end > seq2[j].end) {
            if (j + 1 == seq2.size() || seq2[j + 1].start > seq2[j].end + 1) {
              break;
            } else {
              ++j;
            }
          }
        }
        if (i == seq1.size() || j == seq2.size()) {
          result.push_back({{seq1[i++].word}});
          result.push_back({{seq2[j++].word}});
        } else if (seq1[i].end != seq2[j].end) {
          for (int I = i0; I < i; ++I) {
             result.push_back({{seq1[I++].word}});
          }
          for (int J = j0; J < j; ++J) {
             result.push_back({{seq2[J++].word}});
          }
          ++i, ++j;
        } else {
          vector<string> array1, array2;
          for (int I = i0; I < i; ++I) {
             array1.push_back({seq1[I++].word});
          }
          for (int J = j0; J < j; ++J) {
             array2.push_back({seq2[J++].word});
          }
          result.push_back({array1, array2});
          ++i, ++j;
        }
      }
    }
    for (; i < seq1.size(); ++i) {
      result.push_back({{seq1[i].word}});
    }
    for (; i < seq2.size(); ++j) {
      result.push_back({{seq2[j].word}});
    }
    return result;
  }
};