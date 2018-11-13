import { observable, action } from 'mobx';
import * as api from '../services/posts/api';

export default class PostStore {
  @observable posts = []

  @observable
  params = {
    kw: '',
    current: 1,
    pageSize: 20,
    total: 0,
  }

  @action.bound
  async updatePosts() {
    try {
      const params = {
        kw: this.params.kw || null,
        page: this.params.current || 1,
        pageSize: this.params.pageSize || 20,
      };
      const res = await api.posts(params);
      this.params.total = res.total || 0;
      this.posts.replace(res.list);
    } catch (err) {
      console.error(err);
    }
  }
}
