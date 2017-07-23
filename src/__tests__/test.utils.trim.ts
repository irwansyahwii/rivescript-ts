import utils from '../utils';
declare const require:any;
const RivescriptUtils = require("rivescript/lib/utils");

const test_string1 = '   \n\nabcd\n\n   ';
const test_string2 = '   \n\nabcd\n\n   ';
it(`trim ${test_string1}`, ()=>{    
    return utils.trim(test_string1)
        .map((result:string) => {
            expect(result).toBe(RivescriptUtils.trim(test_string2))
        }).toPromise();
})