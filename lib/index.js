"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.function.name.js");

var _helperPluginUtils = require("@babel/helper-plugin-utils");

var _default = (0, _helperPluginUtils.declare)(function (api) {
  api.assertVersion(7); // types：@babel/types
  // template：@babel/template

  var t = api.types,
      template = api.template;
  return {
    name: 'any',
    // 访问器
    visitor: {
      Identifier: function Identifier(path, state) {
        // 这里可以拿到babel.config.json中传给插件的参数
        // console.log(state.opts);
        var node = path.node;
        if (!node) return;

        if (node.name === 'sum') {
          // 拿到当前 Identifier 的父节点也就是整个表达式
          var parent = path.parent;

          if (parent.type === 'CallExpression') {
            var params = t.arrayExpression();
            var args = parent.arguments;

            for (var i = 0; i < args.length; i++) {
              params.elements.push(args[i]);
            }

            parent.arguments = [params];
            return;
          }

          if (parent.type === 'FunctionDeclaration') {
            // 将sum函数接受的2个参数，改为一个参数
            parent.params = [t.identifier('nums')]; // 修改函数体
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

            parent.body = template("{\n              return nums.reduce((sum, next) => sum + next, 0);\n            }")();
            return;
          }
        }
      }
    }
  };
});

exports.default = _default;
