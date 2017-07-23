import utils from '../utils';
declare const require:any;
const RivescriptUtils = require("rivescript/lib/utils");

const test_string1 = '   abcd1\n23asd   ';
const test_string2 = '   abcd1\n23asd   ';
it(`quotemeta ${test_string1}`, ()=>{    
    return utils.quotemeta(test_string1, false)
        .map((result:string) => {
            expect(result).toBe(RivescriptUtils.quotemeta(test_string2, false))
        }).toPromise();
})

const test_string3 = '   abcd123asd   ';
const test_string4 = '   abcd123asd   ';
it(`quotemeta ${test_string1}`, ()=>{    
    return utils.quotemeta(test_string3, true)
        .map((result:string) => {
            expect(result).toBe(RivescriptUtils.quotemeta(test_string4, true))
        }).toPromise();
})