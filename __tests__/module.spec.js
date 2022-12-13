const Module = require('../src/module');

describe("test Module class", () => {
    // describe("import", () => {
    //     it("default", () => {
    //         const code = "import a from '../module'";
    //         const instance = new Module({
    //             code
    //         });
    //         expect(instance.imports).toEqual({
    //             a: {
    //                 localName: "a",
    //                 name: "",
    //                 source: "../module"
    //             }
    //         })
    //     })
    //     it("spread variable", () => {
    //         const code = "import { a } from '../module'";
    //         const instance = new Module({
    //             code
    //         });
    //         expect(instance.imports).toEqual({
    //             a: {
    //                 localName: "a",
    //                 name: "a",
    //                 source: "../module"
    //             }
    //         })
    //     })
    //     it("spread variable with alias", () => {
    //         const code = "import { a as b } from '../module'";
    //         const instance = new Module({
    //             code
    //         });
    //         expect(instance.imports).toEqual({
    //             b: {
    //                 localName: "b",
    //                 name: "a",
    //                 source: "../module"
    //             }
    //         })
    //     })

    //     it('multi', () => {
    //         const code = `import { a as aa , b }  from '../module'`
    //         const module = new Module({ code })
    //         expect(module.imports).toEqual({
    //             aa: {
    //                 'localName': 'aa',
    //                 'name': 'a',
    //                 'source': '../module'
    //             },
    //             b: {
    //                 'localName': 'b',
    //                 'name': 'b',
    //                 'source': '../module'
    //             }
    //         })
    //     })
    // })

    // describe("export", () => {
    //     it('normal', () => {
    //         const code = `export var a = 1`
    //         const module = new Module({ code, path: '', bundle: null })
    //         expect(module.exports['a'].localName).toBe('a')
    //         expect(module.exports['a'].node).toBe(module.ast.body[0])
    //         expect(module.exports['a'].expression).toBe(module.ast.body[0].declaration)
    //     })
    //     it('default', () => {
    //         const code = `export default home`;
    //         const module = new Module({ code, path: '', bundle: null })
    //         expect(module.exports['home'].name).toBe('home')
    //         expect(module.exports['home'].node).toBe(module.ast.body[0])
    //         expect(module.exports['home'].expression).toBe(module.ast.body[0].declaration)
    //     })

    //     it('mix', () => {
    //         const code = `export var a = 1;
    //         export default home`
    //         const module = new Module({ code });
    //         expect(module.exports).toEqual({
    //             a: {
    //                 localName: 'a',
    //                 node: module.ast.body[0],
    //                 expression: module.ast.body[0].declaration
    //             },
    //             home: {
    //                 name: 'home',
    //                 node: module.ast.body[1],
    //                 expression: module.ast.body[1].declaration
    //             },
    //         })
    //     })
    // })

    // describe('definitions', () => {
    //     it('single declaration', () => {
    //         const code = `const a = 1;`
    //         const module = new Module({ code, path: '', bundle: null })
    //         expect(module.definitions).toEqual({
    //             a: module.ast.body[0],
    //         })
    //     })
    //     it('multi declaration', () => {
    //         const code = `const a = 1;
    //         const b = 2; 
    //         `
    //         const module = new Module({ code, path: '', bundle: null })
    //         expect(module.definitions).toEqual({
    //             a: module.ast.body[0],
    //             b: module.ast.body[1]
    //         })
    //     })
    // })

    describe('tree-shaking', () => {
        // it('filter function b', () => {
        //     const code =
        //         `const a = () =>  1;
        //         const b = () => 2;
        //         a();`
        //     const module = new Module({ code })
        //     const statements = module.expandAllStatements()
        //     expect(statements.length).toBe(2)

        //     expect(module.code.snip(statements[0].start, statements[0].end).toString()).toEqual(`const a = () =>  1;`)
        //     expect(module.code.snip(statements[1].start, statements[1].end).toString()).toEqual(`a();`)
        // })
        it("keep double function A's executor", () => {
            const code =
                `const a = () =>  1;
                const b = () => 2;
                a();
                a();`
            const module = new Module({ code })
            const statements = module.expandAllStatements()
            expect(statements.length).toBe(3)

            expect(module.code.snip(statements[0].start, statements[0].end).toString()).toEqual(`const a = () =>  1;`)
            expect(module.code.snip(statements[1].start, statements[1].end).toString()).toEqual(`a();`)
            expect(module.code.snip(statements[2].start, statements[2].end).toString()).toEqual(`a();`)
        })
        it('include console & exclude function c', () => {
            const code =
                `const a = () =>  1;
                const b = () => 2;
                a();
                a();
                console.log(1)
                c()`
            const module = new Module({ code })
            const statements = module.expandAllStatements()
            expect(statements.length).toBe(4)

            expect(module.code.snip(statements[0].start, statements[0].end).toString()).toEqual(`const a = () =>  1;`)
            expect(module.code.snip(statements[1].start, statements[1].end).toString()).toEqual(`a();`)
            expect(module.code.snip(statements[2].start, statements[2].end).toString()).toEqual(`a();`)
            expect(module.code.snip(statements[3].start, statements[3].end).toString()).toEqual(`console.log(1)`)

        })
    })
})
