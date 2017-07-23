import utils from '../utils';
declare const require:any;
const RivescriptUtils = require("rivescript/lib/utils");

const test_string1 = '   lowercase string   ';
const test_string2 = '   lowercase string   ';
it(`stringFormat ${test_string1}`, ()=>{    
    return utils.stringFormat('uppercase', test_string1)
        .map((result:string) => {
            expect(result).toBe(RivescriptUtils.stringFormat('uppercase',test_string2))
        }).toPromise();
})


const test_string3 = '   Uppercase String   ';
const test_string4 = '   Uppercase String   ';
it(`stringFormat ${test_string3}`, ()=>{    
    return utils.stringFormat( 'lowercase', test_string3)
        .map((result:string) => {
            expect(result).toBe(RivescriptUtils.stringFormat('lowercase', test_string4))
        }).toPromise();
})