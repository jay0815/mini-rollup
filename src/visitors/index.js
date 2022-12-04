const {
  VariableDeclarator,
  VariableDeclaration
} = require('./variable');
const { Program } = require('./program');
const { BlockStatement, FunctionDeclaration } = require('./function');
const { ExportNamedDeclaration,
  ImportDeclaration,
  ImportSpecifier,
  ImportDefaultSpecifier } = require('./module');

module.exports = {
  Program,
  VariableDeclarator,
  VariableDeclaration,
  BlockStatement, FunctionDeclaration,
  ExportNamedDeclaration,
  ImportDeclaration,
  ImportSpecifier,
  ImportDefaultSpecifier
}