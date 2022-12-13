const {
  VariableDeclarator,
  VariableDeclaration
} = require('./variable');
const { Program, Identifier } = require('./program');
const { ExpressionStatement, CallExpression } = require('./expression');
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
  ImportDefaultSpecifier,
  Identifier,
  ExpressionStatement, CallExpression
}