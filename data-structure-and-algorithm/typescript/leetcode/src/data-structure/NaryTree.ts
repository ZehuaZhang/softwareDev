import {Nullable, Data} from '../util/object';

export class NaryTreeNode {
  data: Data;
  childList: Nullable<NaryTreeNode>[];
  constructor(data: Data, ...childList: Nullable<NaryTreeNode>[]) {
    this.data = data;
    this.childList = childList;
  }
}
