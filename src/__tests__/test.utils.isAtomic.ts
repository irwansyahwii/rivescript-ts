import utils from '../utils';
declare const require:any;
const RivescriptUtils = require("rivescript/lib/utils");

const test_string1 = '   abcd\n\nk\nfg\n   ';
const test_string2 = '   abcd\n\nk\nfg\n   ';
it(`isAtomic ${test_string1}`, ()=>{    
    return utils.isAtomic(test_string1)
        .map((result:boolean) => {
            expect(result).toBe(RivescriptUtils.isAtomic(test_string2))
        }).toPromise();
})