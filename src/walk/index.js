const visitors = require('../visitors/index');
const Scope = require('./scope');
const { print } = require('../utils/space');

const enter = (node, parent, indent, [importRecord, exportRecord]) => {
  if (node.type) {
    switch (node.type) {
      case "Program": {
        print(indent, `Global Scope Start`)
        break;
      }
      case "VariableDeclarator": {
        if (parent.type === 'ExportNamedDeclaration') {
          exportRecord.push(node.id.name)
        } else {
          print(indent, `Variable: ${node.id.name}`)
          // just global\function\module and special block scope
          parent._scope.add(node.id.name, null);
        }
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
      case "ImportDefaultSpecifier": {
        importRecord.push(node.local.name)
        break;
      }
      case "ImportSpecifier": {
        importRecord.push(node.local.name)
        break;
      }
      default: {
        node._scope = parent._scope;
        break;
      }
    }
  }
}

const leave = (node, indent, walk) => {
  if (node.type) {
    switch (node.type) {
      case "Program": {
        print(indent, `Global Scope End`)
        console.log('import Declarations:', JSON.stringify(walk.importRecord));
        console.log('export Declarations:', JSON.stringify(walk.exportRecord));
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
  visiter,
  importRecord: [],
  exportRecord: []
}

function visiter (node, parent, walk = executor, indent = 0) {
  if (node.type) {
    const nextVisitors = visitors[node.type];
    walk.enter(node, parent, indent, [walk.importRecord, walk.exportRecord]);
    if (nextVisitors) {
      nextVisitors(node, parent, walk, indent)
    }
    walk.leave(node, indent, walk);
  }
}

module.exports = visiter;