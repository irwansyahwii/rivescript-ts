import utils from '../utils';
declare const require:any;
const RivescriptUtils = require("rivescript/lib/utils");

const test_string1 = '   word1 word2   word3   ';
const test_string2 = '   word1 word2   word3   ';
it(`word_count ${test_string1}`, ()=>{    
    return utils.word_count(test_string1, true)
        .map((result:number) => {
            expect(result).toBe(RivescriptUtils.word_count(test_string2, true))
        }).toPromise();
})