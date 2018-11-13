import { observable } from 'mobx';

export default class BaseStore {
  @observable page = 'home';
}
