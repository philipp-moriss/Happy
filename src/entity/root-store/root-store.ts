import { makeAutoObservable } from "mobx";

import ApplicationStore from "../application";

export class RootStore {
  //init store
  ApplicationStore: typeof ApplicationStore = null as unknown as typeof ApplicationStore;

  constructor() {
    makeAutoObservable(this);
    this.ApplicationStore = ApplicationStore;
  }
}

export default new RootStore();
