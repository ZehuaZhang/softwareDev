// 71. Simplify Path
// Difficulty: Medium

// Given an absolute path for a file (Unix-style), simplify it.

// For example,
// path = "/home/", => "/home"
// path = "/a/./b/../../c/", => "/c"

// Corner Cases:
// Did you consider the case where path = "/../"?
// In this case, you should return "/".
// Another corner case is the path might contain multiple slashes '/' together, such as "/home//foo/".
// In this case, you should ignore redundant slashes and return "/home/foo".

// Time:  O(n)
// Space: O(n)

class Solution {
public:
    string simplifyPath(string path) {
        vector<string> dirs;
        vector<string> tokens(split(path, '/'));
        for (const auto& token : tokens) {
            if (token == ".." && !dirs.empty()) {
                dirs.pop_back();
            } else if (token != ".." && token != "." && !token.empty()) {
                dirs.emplace_back(token);
            }
        }
        return string("/").append(join(dirs, '/'));
    }

private:
    // Split string by delimitor.
    vector<string> split(const string& s, const char delim) {
        vector<string> tokens;
        stringstream ss(s);
        string token;
        while (getline(ss, token, delim)) {
            tokens.emplace_back(token);
        }
        return tokens;
    }

    // Join strings with delimitor.
    string join(const vector<string>& names, const char delim) {
        ostringstream ss;
        if (!names.empty()) {
            const string delimStr(1, delim);
            copy(names.cbegin(), prev(names.cend()),
                 ostream_iterator<string>(ss, delimStr.c_str()));
            ss << names.back();
        }
        return ss.str();
    }
};

// Time:  O(n)
// Space: O(n)

class Solution {
public:
    string simplifyPath(const string& path) {
        vector<string> dirs;
        for (auto i = path.begin(); i != path.end();) {
            ++i;
            auto j = find(i, path.end(), '/');
            auto dir = string(i, j);
            if (dir == ".." && !dirs.empty()) {
                dirs.pop_back();
            } else if (!dir.empty() && dir != "." && dir != "..") {
                dirs.push_back(dir);
            }
            i = j;
        }
        stringstream out;
        if (dirs.empty()) {
            out << "/";
        } else {
            for (auto dir : dirs)
                out << '/' << dir;
            }
        return out.str();
    }
};