const pkg = require('./packageInstaller');

describe('packageInstaller Response Properties:', () => {

    test('packageInstaller() should exist', () => {
        expect( typeof pkg.packageInstaller ).toBe('function');
    })
    
    test('returns a string', () => {
        expect( typeof pkg.packageInstaller('[ "KittenService: CamelCaser", "CamelCaser: " ]') ).toBe('string')
    })

})

describe('packageInstaller input validations:', () => {

    test('Not an array error (empty string)', () => {
        expect( pkg.packageInstaller('') ).toBe('err: an array is required input')
    })

    test('Not an array error (empty object)', () => {
        expect( pkg.packageInstaller({}) ).toBe('err: an array is required input')
    })

})