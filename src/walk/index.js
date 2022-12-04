const visitors = require('../visitors/index');
const Scope = require('./scope');
const { print } = require('../utils/space');

const enter = (node, parent, indent) => {
  if (node.type) {
    switch (node.type) {
      case "Program": {
        print(indent, `Global Scope Start`)
        break;
      }
      case "VariableDeclarator": {
        print(indent, `Variable: ${node.id.name}`)
        // just global\function\module and special block scope
        parent._scope.add(node.id.name, null);
        break;
      }
      case "FunctionDeclaration": {
        const functionScop = new Scope({
          parent: parent._scope
        });
        node._scope = functionScop;
        print(indent, `Function: ${node.id.name} -> Scope Start`)
        parent._scope.add(node.id.name, node._scope);
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
        print(indent, `Global Scope End`)
        break;
      }
      case "FunctionDeclaration": {
        print(indent, `Function: ${node.id.name} -> Scope End`)
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
  visiter
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