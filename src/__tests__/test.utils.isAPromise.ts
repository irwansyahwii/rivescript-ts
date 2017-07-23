import utils from '../utils';
declare const require:any;
const RivescriptUtils = require("rivescript/lib/utils");

declare const Promise:any;

const promise1 = Promise.resolve();
it(`isApromise promise1`, ()=>{    
    return utils.isAPromise(promise1)
        .map((result:boolean) => {
            expect(result).toBe(RivescriptUtils.isAPromise(promise1))
        }).toPromise();
})