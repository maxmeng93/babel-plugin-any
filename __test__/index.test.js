import plugin from '../src/index';
import pluginTester from 'babel-plugin-tester';

pluginTester({
  plugin: plugin,
  tests: {
    'test-CallExpression': {
      code: `
        sum(1,2); 
        sum(1,2,3)
      `,
      snapshot: true
    },
    'test-FunctionDeclaration': {
      code: `
        function sum(a, b) {
          return a + b;
        }
      `,
      snapshot: true
    }
  }
})