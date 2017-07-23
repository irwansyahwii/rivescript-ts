import utils from '../utils';
declare const require:any;
const RivescriptUtils = require("rivescript/lib/utils");

var a  ={
    a1:'asdd',
    a2:'32'
};

var b = {
    c1:'asdd'
};

var a2  ={
    a1:'asdd',
    a2:'32'
};

var b2 = {
    c1:'asdd'
};

it(`extend a with b`, ()=>{    
    return utils.extend(a, b)
        .map((result:any) => {
            RivescriptUtils.extend(a2, b2)
            expect(result).toEqual(a2)
        }).toPromise();
})