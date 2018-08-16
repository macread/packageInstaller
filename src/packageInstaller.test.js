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

    test('Not an array error (number)', () => {
        expect( pkg.packageInstaller(25) ).toBe('err: an array is required input')
    })

    let badData = [ "Cyberportal: Ice", {CamelCaser: 'KittenService'} ]
    test('Invalid item (object)', () => {
        expect( pkg.packageInstaller(badData) ).toBe('err: item 1 in input array is invalid')
    })

    badData = [ "KittenService: CamelCaser", 25 ]
    test('Invalid item (number)', () => {
        expect( pkg.packageInstaller(badData) ).toBe('err: item 1 in input array is invalid')
    })

    badData = [ "KittenService: CamelCaser", "CamelCaser " ]
    test('Invalid item (missing colon)', () => {
        expect( pkg.packageInstaller(badData) ).toBe('err: item 1 in input array is invalid')
    })

})

describe('packageInstaller validate logic', () => {

    test('[ "KittenService: CamelCaser", "CamelCaser: " ] should return "CamelCaser, KittenService"', () => {
        expect( pkg.packageInstaller([ "KittenService: CamelCaser", "CamelCaser: " ]) ).toBe("CamelCaser, KittenService")
    })

    test('[ "CamelCaser: ", "KittenService: CamelCaser" ] should return "CamelCaser, KittenService"', () => {
        expect( pkg.packageInstaller([ "KittenService: CamelCaser", "CamelCaser: " ]) ).toBe("CamelCaser, KittenService")
    })

})