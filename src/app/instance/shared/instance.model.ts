export class Instance {
  id: string;
  hostname: string;
  ip: string;
  properties: {
    platform: string;
    hostname: string;
  };
  executionId: string;
  state: string;

  constructor() {
  }

  static load(data: any) {
    const item = new Instance();
    const instance = Object.assign(item, data);
    return instance;
  }

}



