import utils from '../utils';
declare const require:any;
const RivescriptUtils = require("rivescript/lib/utils");

const obj = {
    a: 1,
    b: 'asda',
    c: function(){

    }
}
it(`clone an object`, ()=>{    
    return utils.clone(obj)
        .map((result:any) => {
            expect(result).toEqual(RivescriptUtils.clone(obj))
        }).toPromise();
})