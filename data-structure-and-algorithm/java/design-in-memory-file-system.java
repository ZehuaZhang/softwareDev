
/**
 * Design In-Memory File System
 * 
 * Design an in-memory file system to simulate the following functions:
 * 
 * ls: Given a path in string format. If it is a file path, return a list that only contains this file's name. If it is a directory path, return the list of file and directory names in this directory. Your output (file and directory names together) should in lexicographic order.
 * 
 * mkdir: Given a directory path that does not exist, you should make a new directory according to the path. If the middle directories in the path don't exist either, you should create them as well. This function has void return type.
 * 
 * addContentToFile: Given a file path and file content in string format. If the file doesn't exist, you need to create that file containing given content. If the file already exists, you need to append given content to original content. This function has void return type.
 * 
 * readContentFromFile: Given a file path, return its content in string format.
 * 
 * Example:
 * 
 * Input: 
 * ["FileSystem","ls","mkdir","addContentToFile","ls","readContentFromFile"]
 * [[],["/"],["/a/b/c"],["/a/b/c/d","hello"],["/"],["/a/b/c/d"]]
 * Output:
 * [null,[],null,null,["a"],"hello"]
 * Explanation:
 * filesystem
 * 
 * Note:
 * 
 * You can assume all file or directory paths are absolute paths which begin with / and do not end with /except that the path is just "/".
 * You can assume that all operations will be passed valid parameters and users will not attempt to retrieve file content or list a directory or file that does not exist.
 * You can assume that all directory names and file names only contain lower-case letters, and same names won't exist in the same directory.
 */

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;

public class FileSystem {
    public FileSystem() {
        dirs = new HashMap<>();
        files= new HashMap<>();
    }

    public List<String> ls(String path) {        
        return new ArrayList<>(dirs.getOrDefault(path, new HashSet<>()));
    }

    public void mkdir(String path) {
        String dir = "/";
        String[] pathList = path.split("/");
        for (String pathItem : pathList) {
            if (!pathItem.isEmpty()) {
                Set<String> childItems = dirs.getOrDefault(dir, new HashSet<>());
                childItems.add(pathItem);
                dirs.put(dir, childItems);

                if (dir.lastIndexOf("/") != dir.length() - 1) {
                    dir += "/";
                }
                dir += pathItem;
            }
        }
    }

    public void addContentToFile(String filePath, String content) {
        String dir = filePath.substring(0, filePath.lastIndexOf("/"));
        if (dir.isEmpty()) {
            dir = "/";
        }

        String filename = filePath.substring(filePath.lastIndexOf("/") + 1);

        if (!dirs.containsKey(filePath)) {
            mkdir(filePath);
        }

        String fileContent = filePath.getOrDefault(filePath, "");
        fileContent += content;
        filePath.put(filePath, fileContent);
    }

    public String readContentFromFile(String filePath) {
        return files.getOrDefault(filePath, "");
    }

    private Map<String, Set<String>> dirs;
    private Map<String, String> files;
};