import BaseStore from './base';
import PostStore from './post';

export default class Store {
  constructor() {
    this.baseStore = new BaseStore();
    this.postStore = new PostStore();
  }
}
