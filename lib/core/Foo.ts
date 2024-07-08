import { example } from "../types/example.js"; //note that all imports should point to .js files! This is because TS will output a .js file once it is transpiled using tsc
import { bar } from "./Bar.js"

/**
 * An example of a JSDoc comment which will show up to the user when they install the package
 */

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
      /**
   * A method to return the toll rate based on the CO2 Class, Axle & Weight Class, and Euro Emission Class of the truck. 
   * @param {string} param - some param
   * @param {number} otherParam - some other param that is a number
   * @returns {number} - returns a random number between 0 to <1
   */

    public someOtherMethod(param: string, otherParam: number):number{
        for(let i = 0; i <= otherParam; i++){
            console.log(this._property.foo + '' + param ) 
            console.log(this.bar.three)
        }
        return Math.random()
      
    }
}

export {Foo}