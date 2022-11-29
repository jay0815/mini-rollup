const {
  VariableDeclarator,
  VariableDeclaration
} = require('./variable');
const { Program } = require('./program');
const { BlockStatement, FunctionDeclaration } = require('./function');

module.exports = {
  Program,
  VariableDeclarator,
  VariableDeclaration,
  BlockStatement, FunctionDeclaration
}