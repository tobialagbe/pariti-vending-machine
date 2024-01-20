const sinon = require('sinon');
import * as assert from 'assert';
import { resetStubAndSpys } from '../../../tests/testHelper';
import appService from '../vending.service';

describe('App Service', () => {
  const sandBox = sinon.createSandbox();
  afterEach(() => {
    resetStubAndSpys([sandBox]);
  });

  it('#app HealthCheck  - successful', async () => {

  });
});
