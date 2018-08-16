const pkg = require('./packageInstaller');

describe('packageInstaller Response Properties:', () => {

    test('packageInstaller() should exist', () => {
        expect( typeof pkg.packageInstaller ).toBe('function');
    })
    
    test('packageInstaller returns a string', () => {
        expect( typeof pkg.packageInstaller('[ "KittenService: CamelCaser", "CamelCaser: " ]') ).toBe('string')
    })

})