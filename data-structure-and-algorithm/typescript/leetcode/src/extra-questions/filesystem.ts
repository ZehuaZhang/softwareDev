class File {
  private static readonly delimiter = '.';
  name: string;
  extension: string;
  size: number;
  constructor(name: string, size: number) {
    const idx = name.indexOf(File.delimiter);
    this.name = name.substring(0, idx);
    this.size = size;
    this.extension = name.substring(idx + 1);
  }

  get filename(): string {
    return `${this.name}.${this.extension}`;
  }

  static isFile(name: string): boolean {
    return name.includes(File.delimiter);
  }
}

class Folder {
  name: string;
  path: string;
  folderMap: Map<string, Folder>;
  fileMap: Map<string, File>;
  constructor(name: string, path: string) {
    this.name = name;
    this.path = path;
    this.folderMap = new Map<string, Folder>();
    this.fileMap = new Map<string, File>();
  }

  get pathname(): string {
    if (!this.path && !this.name) {
      return '';
    }
    return `${this.path}/${this.name}`;
  }

  addFolder(name: string): Folder {
    if (this.folderMap.has(name)) {
      return this.folderMap.get(name)!;
    }

    const folder = new Folder(name, this.pathname);
    this.folderMap.set(name, folder);
    return folder;
  }

  addFile(name: string, size: number): File {
    const file = new File(name, size);
    this.fileMap.set(name, file);
    return file;
  }
}

class SearchFileSystem {
  root: Folder;
  constructor() {
    this.root = new Folder('', '');
  }

  addPath(path: string, size?: number): void {
    const list = path.split('/').filter(Boolean);
    addPathDfs(this.root, size);

    function addPathDfs(folder: Folder, size?: number): void {
      const {length} = list;
      if (length === 0) {
        return;
      }
      const name = list.shift()!;
      if (File.isFile(name)) {
        folder.addFile(name, size!);
      } else {
        const subFolder = folder.addFolder(name);
        addPathDfs(subFolder, size);
      }
    }
  }

  searchExtension(name: string): string[] {
    const result: string[] = [];
    searchExtensionDfs(this.root);
    return result;

    function searchExtensionDfs(folder: Folder) {
      const {pathname, fileMap, folderMap} = folder;
      for (const file of fileMap.values()) {
        const {extension, filename} = file;
        if (extension === name) {
          result.push(`${pathname}/${filename}`);
        }
      }
      for (const subFolder of folderMap.values()) {
        searchExtensionDfs(subFolder);
      }
    }
  }

  searchSize(size: number): string[] {
    const result: string[] = [];
    searchSizeDfs(this.root);
    return result;

    function searchSizeDfs(folder: Folder) {
      const {pathname, fileMap, folderMap} = folder;
      for (const file of fileMap.values()) {
        const {size: filesize, filename} = file;
        if (filesize === size) {
          result.push(`${pathname}/${filename}`);
        }
      }
      for (const subFolder of folderMap.values()) {
        searchSizeDfs(subFolder);
      }
    }
  }

  searchName(name: string): string[] {
    const result: Set<string> = new Set<string>();
    searchNameDfs(this.root);
    return [...result];

    function searchNameDfs(folder: Folder) {
      const {pathname, fileMap, folderMap} = folder;
      if (pathname.includes(name)) {
        result.add(pathname);
      }

      for (const file of fileMap.values()) {
        const {filename} = file;
        const filepathname = `${pathname}/${filename}`;
        if (filepathname.includes(name)) {
          result.add(filepathname);
        }
      }
      for (const subFolder of folderMap.values()) {
        searchNameDfs(subFolder);
      }
    }
  }
}

const fileSystem = new SearchFileSystem();

fileSystem.addPath('/foo/bar.txt', 400);
fileSystem.addPath('/foo/mar.txt', 600);
fileSystem.addPath('/zoo/bar.txt', 500);
fileSystem.addPath('/tar.zip', 500);

console.log('searchExtension', 'txt', fileSystem.searchExtension('txt'));
console.log('searchExtension', 'zip', fileSystem.searchExtension('zip'));

console.log('searchSize', 400, fileSystem.searchSize(400));
console.log('searchSize', 600, fileSystem.searchSize(600));
console.log('searchSize', 500, fileSystem.searchSize(500));

console.log('searchName', '', fileSystem.searchName(''));
console.log('searchName', '/', fileSystem.searchName('/'));
console.log('searchName', 'foo', fileSystem.searchName('foo'));
console.log('searchName', 'zoo', fileSystem.searchName('zoo'));
console.log('searchName', 'tar', fileSystem.searchName('tar'));
console.log('searchName', 'bar', fileSystem.searchName('bar'));
console.log('searchName', 'mar', fileSystem.searchName('mar'));
console.log('searchName', 'tar.zip', fileSystem.searchName('tar.zip'));
console.log('searchName', 'bar.txt', fileSystem.searchName('bar.txt'));
console.log('searchName', 'mar.txt', fileSystem.searchName('mar.txt'));
console.log(
  'searchName',
  '/foo/bar.txt',
  fileSystem.searchName('/foo/bar.txt')
);
console.log(
  'searchName',
  '/foo/mar.txt',
  fileSystem.searchName('/foo/mar.txt')
);
console.log('searchName', '/tar.zip', fileSystem.searchName('/tar.zip'));
