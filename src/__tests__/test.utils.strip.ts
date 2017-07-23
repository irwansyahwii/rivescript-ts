import utils from '../utils';
declare const require:any;
const RivescriptUtils = require("rivescript/lib/utils");

const test_string1 = '   abcd\n\nk\nfg\n   ';
const test_string2 = '   abcd\n\nk\nfg\n   ';
it(`strip ${test_string1}`, ()=>{    
    return utils.strip(test_string1)
        .map((result:string) => {
            expect(result).toBe(RivescriptUtils.strip(test_string2))
        }).toPromise();
})