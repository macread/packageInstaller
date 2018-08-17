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
        // expect( pkg.packageInstaller(badData) ).toBe('err: item 1 in input array is invalid')
    })

})

describe('packageInstaller validate logic', () => {

    test('[ "KittenService: CamelCaser", "CamelCaser: " ] should return "CamelCaser, KittenService"', () => {
        expect( pkg.packageInstaller([ "KittenService: CamelCaser", "CamelCaser: " ]) ).toBe("CamelCaser, KittenService")
    })

    test('[ "CamelCaser: ", "KittenService: CamelCaser" ] should return "CamelCaser, KittenService"', () => {
        expect( pkg.packageInstaller([ "CamelCaser: ", "KittenService: CamelCaser" ]) ).toBe("CamelCaser, KittenService")
    })

    let moreThanTwo =  [
        "KittenService: ", 
        "Leetmeme: Cyberportal", 
        "Cyberportal: Ice", 
        "CamelCaser: KittenService", 
        "Fraudstream: Leetmeme", 
        "Ice: "
        ]

    test('More than two test 1', () => {
        expect( pkg.packageInstaller(moreThanTwo) ).toBe("KittenService, Ice, Cyberportal, Leetmeme, CamelCaser, Fraudstream")
    })

    let circular =  [
        "KittenService: ", 
        "Leetmeme: Cyberportal", 
        "Cyberportal: Ice", 
        "CamelCaser: KittenService", 
        "Fraudstream: ", 
        "Ice: Leetmeme"
        ]

    test('Circular Test', () => {
        expect( pkg.packageInstaller(circular) ).toBe("err: circular dependencies")
    })
})

describe('packageInstaller additional tests', () => {

    test('[ "KittenService: ", "CamelCaser: " ] should return "KittenService, CamelCaser"', () => {
        expect( pkg.packageInstaller([ "KittenService: ", "CamelCaser: " ]) ).toBe("KittenService, CamelCaser")
    })

    test('[ "CamelCaser: ", "KittenService: " ] should return "CamelCaser, KittenService"', () => {
        expect( pkg.packageInstaller([ "CamelCaser: ", "KittenService: " ]) ).toBe("CamelCaser, KittenService")
    })

    let moreThanTwo =  [
        "KittenService: ", 
        "Leetmeme: Cyberportal", 
        "Cyberportal: ", 
        "CamelCaser: KittenService", 
        "Fraudstream: ", 
        "Ice: "
        ]

    test('More than two test 1', () => {
        expect( pkg.packageInstaller(moreThanTwo) ).toBe("KittenService, Cyberportal, Leetmeme, CamelCaser, Fraudstream, Ice")
    })

    moreThanTwo =  [
        "KittenService: ", 
        "Leetmeme: Cyberportal", 
        "Cyberportal: ", 
        "CamelCaser: KittenService", 
        "Fraudstream: ", 
        "Ice: Leetmeme"
        ]

    test('Circular Test', () => {
        expect( pkg.packageInstaller(moreThanTwo) ).toBe("KittenService, Cyberportal, Leetmeme, CamelCaser, Fraudstream, Ice")
    })
})