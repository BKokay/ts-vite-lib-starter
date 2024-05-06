import { example } from "../types/example.js"; //note that all imports should point to .js files! This is because TS will output a .js file once it is transpiled using tsc
import { bar } from "./Bar.js"

class Foo {
    private _property: example; //any properties in the constructor must have a type declared before the constructor
    bar: typeof bar; //if you import a class or property, TS can infer it's types using typeof 
    constructor(property: example){
        this._property = property
        this.bar = bar; 
    }
    //this will remain private when transpiled to JS and not be available with intellisense when someone imports your package 
    private someMethod(){
        return this._property
    }
    //this will be public and anyone who imports your package will see the method 
    public someOtherMethod(param: string, otherParam: number){
        for(let i = 0; i <= otherParam; i++){
            console.log(this._property.foo + '' + param ) 
            console.log(this.bar.three)
        }
      
    }
}

export {Foo}