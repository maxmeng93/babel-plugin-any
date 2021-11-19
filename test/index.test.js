import * as path from 'path';
import plugin from '../src/index';
import pluginTester from 'babel-plugin-tester';

pluginTester({
  plugin: plugin,
  fixtures: path.join(__dirname, '__fixtures__'),
})