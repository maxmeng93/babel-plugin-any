import { declare } from '@babel/helper-plugin-utils';

export default declare((api) => {
  api.assertVersion(7);

  // types：@babel/types
  // template：@babel/template
  const { types: t, template } = api;

  return {
    name: 'any',
    // 访问器
    visitor: {
      Identifier(path, state) {
        // 这里可以拿到babel.config.json中传给插件的参数
        // console.log(state.opts);

        const { node } = path;
        if (!node) return;

        if (node.name === 'sum') {
          // 拿到当前 Identifier 的父节点也就是整个表达式
          const parent = path.parent;

          if (parent.type === 'CallExpression') {

            const params = t.arrayExpression();
            const args = parent.arguments;

            for (let i = 0; i < args.length; i++) {
              params.elements.push(args[i]);
            }
            parent.arguments = [params];
            return;
          }

          if (parent.type === 'FunctionDeclaration') {
            // 将sum函数接受的2个参数，改为一个参数
            parent.params = [t.identifier('nums')];

            // 修改函数体
            // parent.body = t.blockStatement([
            //   t.returnStatement(t.callExpression(
            //     t.memberExpression(
            //       t.identifier('nums'),
            //       t.identifier('reduce')
            //     ),
            //     [
            //       t.arrowFunctionExpression(
            //         [t.identifier('sum'), t.identifier('next')],
            //         t.binaryExpression('+', t.identifier('sum'), t.identifier('next'))
            //       ),
            //       t.numericLiteral(0)
            //     ]
            //   ))
            // ]);

            // 利用 @babel/template 简化以上代码写法
            parent.body = template(`{
              return nums.reduce((sum, next) => sum + next, 0);
            }`)();

            return;
          }
        }
      },
    },
  };
})
