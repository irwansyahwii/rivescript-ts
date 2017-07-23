import * as Rx from 'rxjs/Rx';

class Utils {
    /**
     * Strip extra whitespace from both ends of the string, and remove
     * line breaks anywhere in the string.
     */
    public strip(text:string):Rx.Observable<string>{
        return Rx.Observable.create((s:Rx.Observer<string>) => {
            try {
                text = text.replace(/^[\s\t]+/, "") 
                            .replace(/[\s\t]+$/, "") 
                            .replace(/[\x0D\x0A]+/, "");

                s.next(text);
                s.complete();
            } catch (error) {
                s.error(error);
            }
        })

    }

    /**
     * Compatible implementation of `String.prototype.trim()`. Strips whitespace
     * from the beginning and end of the string, but doesn't remove any
     * whitespace inside the string like `strip()` does.
     */
    public trim(text:string):Rx.Observable<string>{
        return Rx.Observable.create((s:Rx.Observer<string>) => {
            try {
                text = text.trim()

                s.next(text);
                s.complete();
            } catch (error) {
                s.error(error);
            }
        })
    }

    /**
     * Combine the properties of both objects into one. The properties from
     * object 'b' are inserted into 'a'.
     * 
     * @param a 
     * @param b 
     */
    public extend(a:any, b:any):Rx.Observable<any>{
        return Rx.Observable.create((s:Rx.Observer<any>)=>{
            try {
                for (var key in b) {                    
                    if (b.hasOwnProperty(key)){
                        var val = b[key];
                        a[key] = val;
                    }
                }

                s.next(a);
                s.complete();
            } catch (error) {
                s.error(error);
            }
        })
    }

    /**
     * Count the number of real words in a string
     * 
     * @param trigger 
     * @param all 
     */
    public word_count(trigger:string, all:boolean):Rx.Observable<number>{
        return Rx.Observable.create((s:Rx.Observer<number>) =>{
            try {
                let words = [];
                if(all){
                     words = trigger.split(/\s+/);
                }else{
                    words = trigger.split(/[\s\*\#\_\|]+/);
                }
                let wc = 0;

                for(let word of words){
                    if(word.length > 0){
                        wc++;
                    }
                }

                s.next(wc);
                s.complete();
            } catch (error) {
                s.error(error);
            }
        })
    }

    /**
     * Stip special characters out of a string.
     * 
     * @param text 
     * @param utf8 
     */
    public stripNasties(text:string, utf8:boolean):Rx.Observable<string>{
        return Rx.Observable.create((s:Rx.Observer<string>) =>{
            try {                
                if(utf8){
                    text = text.replace(/[\\<>]+/g, "");                    
                }else{
                    text = text.replace(/[^A-Za-z0-9 ]/g, "");
                }

                s.next(text);
                s.complete();
            } catch (error) {
                s.next(error);
            }
        })
    }

    /**
     * Escape a string for a regexp.
     * @param text 
     */
    public quotemeta(text:string):Rx.Observable<string>{
        return Rx.Observable.create((s:Rx.Observer<string>) =>{
            try {
                let unsafe = "\\.+*?[^]$(){}=!<>|:".split("");
                for(let ch of unsafe){
                    text = text.replace(new RegExp("\\#{char}", "g"), "\\#{char}");
                }

                s.next(text);
                s.complete();
            } catch (error) {
                s.error(error);
            }
        })
    }

    /**
     * Determine whether a trigger is atomic.
     * 
     * @param trigger 
     */
    public isAtomic(trigger:string):Rx.Observable<boolean>{
        return Rx.Observable.create((s:Rx.Observer<boolean>) =>{
            try {
                let result:boolean = true;
                for(let special of ["*", "#", "_", "(", "[", "<", "@" ]){
                    if(trigger.indexOf(special) > -1){
                        result = false;
                        break;
                    }
                }

                s.next(result);
                s.complete();                
            } catch (error) {
                s.next(error);
            }
        });

    }

    /**
     * Formats a string according to one of the following types:
     * - formal
     * - sentence
     * - uppercase
     * - lowercase
     * 
     * @param type 
     * @param text 
     */
    public stringFormat(type:string, text:string):Rx.Observable<string>{
        return Rx.Observable.create((s:Rx.Observer<string>) =>{
            try {
                let result:string = "";

                if(type === "uppercase"){
                    result = text.toUpperCase();
                }else if(type === "lowercase"){
                    result = text.toLowerCase();
                }else if(type === "sentence"){
                    text += "";
                    let first = text.charAt(0).toUpperCase();
                    result = first + text.substring(1);
                }else if(type === "format"){
                    let words = text.split(/\s+/);
                    let resultArr = [];
                    for(let word of words){
                        let first = word.charAt(0).toUpperCase();
                        resultArr.push(first + word.substring(1));                        
                    }

                    result = resultArr.join(" ");
                    
                }
       
                s.next(result);
                s.complete();                
            } catch (error) {
                s.next(error);
            }
        });

    }

    /**
     * Clone an object.
     * 
     * @param obj 
     */
    public clone(obj:any):Rx.Observable<any>{
        return Rx.Observable.create((s:Rx.Observer<any>) =>{
            try {
                let result:any = null;
                if(obj === null || typeof obj !== "object" ){
                    result = obj;
                } else{
                    let copy = obj.constructor();

                    for (var key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            var element = obj[key];
                            copy[key] = element;
                        }
                    }

                    result = copy;
                }

                s.next(result);
                s.complete();
                
            } catch (error) {
                s.error(error);
            }
        })
    }

    /**
     * Determines if obj looks like a promise
     * 
     * @param obj 
     */
    public isAPromise(obj:any):Rx.Observable<boolean>{
        return Rx.Observable.create((s:Rx.Observer<boolean>) =>{
            try {
                let result:boolean = obj && obj.then && obj.catch && obj.finally
                                        && typeof obj.then === "function"
                                        && typeof obj.catch === "function"
                                        && typeof obj.finally === "function";

                s.next(result);
                s.complete();

            } catch (error) {
                s.error(error);
            }
        })
    }

    /**
     * Finds a match in a string at a given index
     * 
     * Usage:
     * string = "My name is Rive"
     * match = " "
     * index = 2
     * return = 7
     * 
     * @param text 
     * @param match 
     * @param index 
     */
    public nIndexOf(text:string, match:string, index:number):Rx.Observable<number>{
        return Rx.Observable.create((s:Rx.Observer<number>) =>{
            try {
                let result:number = text.split(match, index).join(match).length

                s.next(result);
                s.complete();
            } catch (error) {
                s.error(error);
            }
        })
    }
    
}

const utils = new Utils();

export default utils;