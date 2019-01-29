import { TestSuite } from './test-suite.model';

declare function require(name: string);
const ObjectID = require('bson-objectid');

export class Scenario {
  id: string;
  name: string;
  description: string;
  configuration: {
    name?: string;
    targetMode?: string;
    runMode?: string;
    type?: string;
    properties: any;
  };
  pendingTimeout: number;
  runningTimeout: number;
  schedule: string;
  scheduled: boolean;
  afterHandlers: {
    id: string;
    name: string;
    type: string;
    enabled: boolean
    properties: any;
  }[];
  testSuiteId: string;
  private testSuite: TestSuite;

  constructor() {
    this.configuration = { properties: {} };
    this.scheduled = false;
    this.afterHandlers = [];
    this.testSuite = new TestSuite();
    this.testSuiteId = this.testSuite.id;

    this.pendingTimeout = 30000;
    this.runningTimeout = 30000;
  }

  static load(data: any) {
    const item = new Scenario();
    const testSuite = TestSuite.load(data.testSuite);
    const scenario = Object.assign(item, data);
    scenario.setTestSuite(testSuite);
    return scenario;
  }

  setTestSuite(testSuite: TestSuite) {
    this.testSuite = testSuite;

    if (this.testSuite.id === undefined) {
      this.testSuite.id = this.testSuiteId;
    } else {
      this.testSuiteId = this.testSuite.id;
    }
  }

  getTestSuite() {
    return this.testSuite;
  }

}
