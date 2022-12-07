const Module = require('../src/module');

// describe("test Module", () => {

//   describe("test Import", () => {
//     it("Import 1", () => {
//       const code = "import a from '../module'";
//       const instance = new Module({
//         code
//       });

//       expect(instance.imports).toEqual({
//         a: {
//           localName: "a",
//           name: "",
//           source: "../module"
//         }
//       })
//     })
//     it("speard variable with alias", () => {
//       const code = "import { a as b } from '../module'";
//       const instance = new Module({
//         code
//       });

//       expect(instance.imports).toEqual({
//         a: {
//           localName: "b",
//           name: "a",
//           source: "../module"
//         }
//       })
//     })
//   })
//   describe("test exports", () => {
//     it('export', () => {
//       const code = `export var a = 1`
//       const module = new Module({ code, path: '', bundle: null })
//       expect(module.exports['a'].localName).toBe('a')
//       expect(module.exports['a'].node).toBe(module.ast.body[0])
//       expect(module.exports['a'].expression).toBe(module.ast.body[0].declaration)
//     })

//     it('default', () => {
//       const code = `export default home`
//       const module = new Module({ code, path: '', bundle: null })
//       expect(module.exports['home'].name).toBe('home')
//       expect(module.exports['home'].node).toBe(module.ast.body[0])
//       expect(module.exports['home'].expression).toBe(module.ast.body[0].declaration)
//     })
//   })


//     describe('定义变量 definitions', () => {
//         it('export', () => {
//             const code = `const a = 1;
//             const b = 2; 
//             `
//             const module = new Module({ code, path: '', bundle: null })
//             expect(module.definitions).toEqual({
//                 a: module.ast.body[0],
//                 b: module.ast.body[1]
//             })
//         })
//     })


//     describe('expandAllStatements', () => {
//         it('', () => {
//             const code = `const a = () =>  1;
//             const b = () =>  1;
//             a();
//             `
//             const module = new Module({ code, path: '', bundle: null })
//             const statements = module.expandAllStatements()
//             // console.log(statements)
//             expect(statements.length).toBe(2)
//         })
//     })

// })

describe('测试 Module', () => {
    describe('构造方法', () => {
        describe('imports', () => {
            it('单个import', () => {
                const code = `import {a as aa } from '../module'`
                const module = new Module({ code })
                expect(module.imports).toEqual({
                    aa: {
                        'localName': 'aa',
                        'name': 'a',
                        'source': '../module'
                    }
                })
            })

            it('多个import', () => {
                const code = `import {a as aa ,b }  from '../module'`
                const module = new Module({ code })
                expect(module.imports).toEqual({
                    aa: {
                        'localName': 'aa',
                        'name': 'a',
                        'source': '../module'
                    },
                    b: {
                        'localName': 'b',
                        'name': 'b',
                        'source': '../module'
                    }
                })
            })
        })

        describe('exports', () => {
            it('单个export', () => {
                const code = `export var a = 1`
                const module = new Module({ code })
                expect(module.exports['a'].localName).toBe('a')
                expect(module.exports['a'].node).toBe(module.ast.body[0])
                expect(module.exports['a'].expression).toBe(module.ast.body[0].declaration)
            })

        })


        describe('definitions', () => {
            it('单个变量', () => {
                const code = `const a = 1`
                const module = new Module({ code })
                expect(module.definitions).toEqual({
                    a: module.ast.body[0]
                })
            })
        })
    })

    describe('ExpandAllStatement', () => {
        it('基础', () => {
            const code =
                `const a = () =>  1;
                const b = () => 2;
                a();`
            const module = new Module({ code })
            const statements = module.expandAllStatements()
            expect(statements.length).toBe(2)

            expect(module.code.snip(statements[0].start, statements[0].end).toString()).toEqual(`const a = () =>  1;`)
            expect(module.code.snip(statements[1].start, statements[1].end).toString()).toEqual(`a();`)

        })
        it('double 2', () => {
            const code =
                `const a = () =>  1;
                const b = () => 2;
                a();
                a();`
            const module = new Module({ code })
            const statements = module.expandAllStatements()
            expect(statements.length).toBe(2)

            expect(module.code.snip(statements[0].start, statements[0].end).toString()).toEqual(`const a = () =>  1;`)
            expect(module.code.snip(statements[1].start, statements[1].end).toString()).toEqual(`a();`)

        })
        it('console.log', () => {
            const code =
                `const a = () =>  1;
                const b = () => 2;
                a();
                a();
                console.log(1)`
            const module = new Module({ code })
            const statements = module.expandAllStatements()
            expect(statements.length).toBe(2)

            expect(module.code.snip(statements[0].start, statements[0].end).toString()).toEqual(`const a = () =>  1;`)
            expect(module.code.snip(statements[1].start, statements[1].end).toString()).toEqual(`a();`)

        })
    })
})