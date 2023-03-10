import {Nullable, isNull} from '../util/object';

enum Action {
  Set = 'set',
  Delete = 'delete',
}

class Dictionary<T> {
  history: {
    key: string;
    data: Nullable<T>;
    action: Action;
    prevData: Nullable<T>;
  }[];
  index: number;
  map: Map<string, T>;
  constructor() {
    this.history = [];
    this.index = 0;
    this.map = new Map<string, T>();
  }

  get(key: string): Nullable<T> {
    if (!this.map.has(key)) {
      console.log(`get key=${key} error: key not found\n`);
      return null;
    }
    const data = this.map.get(key)!;
    console.log(`get key=${key} data=${data}\n`);
    return data;
  }

  set(key: string, data: T): void {
    console.log(`set key=${key} data=${data}\n`);
    this.logAction(Action.Set, key, data);
    this.map.set(key, data);
  }

  delete(key: string): Nullable<T> {
    if (!this.map.has(key)) {
      console.log(`delete key=${key} error: key not found\n`);
      return null;
    }
    console.log(`delete key=${key}\n`);
    const data = this.map.get(key)!;
    this.logAction(Action.Delete, key, null);
    this.map.delete(key);

    return data;
  }

  undo(): boolean {
    console.log('undo\n');
    if (this.index === 0) {
      return false;
    }

    const {key, action, prevData} = this.history[this.index--];
    switch (action) {
      case Action.Set:
        if (isNull(prevData)) {
          this.map.delete(key);
        } else {
          this.map.set(key, prevData!);
        }
        break;
      case Action.Delete:
        this.map.set(key, prevData!);
        break;
      default:
        throw 'Action not defined';
    }
    return true;
  }

  redo(): boolean {
    console.log('redo\n');
    if (this.index === this.history.length - 1) {
      return false;
    }
    const {key, data, action} = this.history[++this.index];
    switch (action) {
      case Action.Set:
        this.map.set(key, data!);
        break;
      case Action.Delete:
        this.map.delete(key);
        break;
      default:
        throw 'Action not defined';
    }
    return true;
  }

  logAction(action: Action, key: string, data: Nullable<T>) {
    this.history = this.history.slice(
      0,
      this.history.length ? ++this.index : 0
    );
    this.history.push({key, data, action, prevData: this.map.get(key) || null});
  }
}

const dict = new Dictionary();

dict.set('a', 6);
dict.get('a');
dict.set('b', 8);
dict.get('b');
dict.undo();
dict.get('b');
dict.redo();
dict.get('b');
dict.set('b', 7);
dict.get('b');
dict.redo();
dict.get('b');
dict.undo();
dict.get('b');
dict.undo();
dict.get('b');
dict.set('b', 1);
dict.get('b');
dict.redo();
dict.get('b');
dict.redo();
dict.get('b');
