import { makeAutoObservable } from "mobx";

export class ApplicationStore {
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setLoading = (bool: boolean) => {
    this.isLoading = bool
  }
}

export default new ApplicationStore();
