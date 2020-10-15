import { storage } from '@core/utils';

function storageName(param) {
  const id = param ? param : Date.now().toString();
  return "excel:" + id;
}

export class LocalStorageClient {
  constructor(name) {
    this.name = storageName(name);
  }

  save(state) {
    storage(this.name, state);
    return Promise.resolve();
  }

  get() {
    return new Promise(resolve => {
      const state = storage(this.name);
      setTimeout(() => resolve(state), 2000);
    });
  }
}
