import utils from '../utils';
declare const require:any;
const RivescriptUtils = require("rivescript/lib/utils");

const test_string1 = '   abcd1\n23asd   ';
const test_string2 = '   abcd1\n23asd   ';
it(`stripNasties ${test_string1}`, ()=>{    
    return utils.stripNasties(test_string1, false)
        .map((result:string) => {
            expect(result).toBe(RivescriptUtils.stripNasties(test_string2, false))
        }).toPromise();
})

const test_string3 = '   abcd123asd   ';
const test_string4 = '   abcd123asd   ';
it(`stripNasties ${test_string1} with utf8 true`, ()=>{    
    return utils.stripNasties(test_string3, true)
        .map((result:string) => {
            expect(result).toBe(RivescriptUtils.stripNasties(test_string4, true))
        }).toPromise();
})