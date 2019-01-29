declare function require(name: string);
const ObjectID = require('bson-objectid');

export class TestSuite {
  id?: string;
  name?: string;
  tests?: {
    id?: string;
    name?: string;
    description?: string;
    type?: string;
    stages?: {
      name?: string;
      run?: string;
      stop?: string;
      cwd?: string;
      mandatory?: boolean;
      timeout?: number;
    }[];
  }[];

  constructor() {
    this.id = ObjectID().toString();
    this.name = 'test suite';
    this.tests = [
      {
        name: '',
        stages: [
          {
            run: ''
          }
        ]
    }];
  }

  static load(data: any) {
    const item = new TestSuite();
    return Object.assign(item, data);
  }

}
