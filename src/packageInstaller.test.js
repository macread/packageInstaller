const pkg = require('./packageInstaller');

describe('packageInstaller Response Properties:', () => {

    test('packageInstaller() should exist', () => {
        expect( typeof pkg.packageInstaller ).toBe('function');
    })
    

})