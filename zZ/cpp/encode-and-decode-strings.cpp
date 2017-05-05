// 271. Encode and Decode Strings
// Difficulty: Medium

// Design an algorithm to encode a list of strings to a string. 
// The encoded string is then sent over the network and is decoded back to the original list of strings.

// Machine 1 (sender) has the function:

// string encode(vector<string> strs) {
//   // ... your code
//   return encoded_string;
// }
// Machine 2 (receiver) has the function:

// vector<string> decode(string s) {
//   //... your code
//   return strs;
// }

// So Machine 1 does:
// string encoded_string = encode(strs);

// and Machine 2 does:
// vector<string> strs2 = decode(encoded_string);

// strs2 in Machine 2 should be the same as strs in Machine 1.

// Implement the encode and decode methods.

// Note:
// The string may contain any possible characters out of 256 valid ascii characters.
// Your algorithm should be generalized enough to work on any possible characters.
// Do not use class member/global/static variables to store states. Your encode and decode algorithms should be stateless.
// Do not rely on any library method such as eval or serialize methods. You should implement your own encode/decode algorithm.

// Time:  O(n)
// Space: O(1)

class Codec {
public:
  // Encodes a list of strings to a single string.
  string encode(vector<string>& strs) {
    string s;
    for (auto str : strs) {
      s += to_string(str.size()) + "/" + str;
    }
    return s;
  }

  // Decodes a single string to a list of strings.
  vector<string> decode(string s) {
    vector<string> strs;

    for (size_t pos = 0; pos < s.length();) {
      auto slash = s.find("/", pos);
      size_t len = strtol(s.substr(pos, slash - pos));
      strs.push_back(s.substr(++slash, len));
      pos = slash + len;
    }
    return strs;
  }
};
