const visitors = require('../visitors/index');
const Scope = require('./scope');
const { print } = require('../utils/space');

const enter = (node, parent, indent) => {
  if (node.type) {
    switch (node.type) {
      case "Program": {
        // print(indent, `Global Scope Start`)
        break;
      }
      case "Identifier": {
        //从当前的作用域向上递归，找这个变量在哪个作用域中定义 
        const definingScope = node._scope.findDefiningScope(node.name); 
        if (!definingScope) { 
            statement._dependsOn[node.name] = true;//表示这是一个外部依赖的变量 
        }
        break;
      }
      case "VariableDeclarator": {
        if (parent.type === 'ExportNamedDeclaration') {
          parent._module.setExportParams(node.id.name, {
            localName: node.id.name,
            node: parent,
            expression: parent.declaration
          })
        } else {
          // print(indent, `Variable: ${node.id.name}`)
          // just global\function\module and special block scope
          parent._module.setDefinitions(node.id.name, parent)
          parent._scope.add(node.id.name, null);
        }
        break;
      }
      case "ExportDefaultDeclaration": {
        parent._module.setExportParams(node.declaration.name, {
          name: node.declaration.name,
          expression: node.declaration,
          node: node,
        })
        break;
      }
      case "FunctionDeclaration": {
        const functionScop = new Scope({
          parent: parent._scope
        });
        node._scope = functionScop;
        // print(indent, `Function: ${node.id.name} -> Scope Start`)
        parent._scope.add(node.id.name, node._scope);
        break;
      }
      case "ImportDefaultSpecifier": {
        parent._module.setImportParams(node.local.name, {
          localName: node.local.name,
          name: "",
          source: parent.source.value
        })
        break;
      }
      case "ImportSpecifier": {
        parent._module.setImportParams(node.imported.name, {
          localName: node.local.name,
          name: node.imported.name,
          source: parent.source.value
        })
        break;
      }
      default: {
        node._scope = parent._scope;
        node._module = parent._module;
        break;
      }
    }
  }
}

const leave = (node, indent) => {
  if (node.type) {
    switch (node.type) {
      case "Program": {
        // print(indent, `Global Scope End`)
        break;
      }
      case "FunctionDeclaration": {
        // print(indent, `Function: ${node.id.name} -> Scope End`)
        break;
      }
      default: {
        break;
      }
    }
  }
}

const executor = {
  enter,
  leave,
  visiter,
}

function visiter (node, parent, walk = executor, indent = 0) {
  if (node.type) {
    const nextVisitors = visitors[node.type];
    walk.enter(node, parent, indent);
    if (nextVisitors) {
      nextVisitors(node, parent, walk, indent)
    }
    walk.leave(node, indent);
  }
}

module.exports = visiter;