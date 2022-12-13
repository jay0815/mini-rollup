const visitors = require('../visitors/index');
const Scope = require('./scope');
// const { print } = require('../utils/space');

const enter = (node, parent, indent) => {
  if (parent && parent._addToStatement) {
    node._addToStatement = parent._addToStatement;
  }
  if (parent && parent._module) {
    node._module = parent._module;
  }
  if (parent && parent._addToScope) {
    node._addToScope = parent._addToScope;
  }
  if (node.type) {
    switch (node.type) {
      case "Program": {
        // print(indent, `Global Scope Start`)
        break;
      }
      case "Identifier": {
        node._addToStatement(node.name);
        break;
      }
      case "VariableDeclarator": {
        node._addToScope(node)
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
        // print(indent, `Function: ${node.id.name} -> Scope Start`)
        const functionScop = new Scope({
          parent: parent._scope
        });
        node._scope = functionScop;
        parent._scope.add(node.id.name, node._scope);
        node._addToScope(node)
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
        parent._module.setImportParams(node.local.name, {
          localName: node.local.name,
          name: node.imported.name,
          source: parent.source.value
        })
        break;
      }
      default: {
        node._scope = parent._scope;
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
        node._addToStatement = undefined;
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