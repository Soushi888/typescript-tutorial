function Logger(logString: string) {
  return (constructor: Function) => {
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  return (constructor: any) => {
    console.log("TEMPLATE FACTORY");
    const hookEL = document.getElementById(hookId);
    const p = new constructor();

    if (hookEL) {
      hookEL.innerHTML = template;
      hookEL.querySelector("h1")!.textContent = p.name;
    }
  };
}

@WithTemplate("<h1>My Person Object !</h1>", "app")
@Logger("LOGGER FACTORY")
class Person {
  name = "Sacha";

  constructor() {
    console.log("creating person object...");
  }
}

const person = new Person();
console.log(person);

//--- Properties decorators
function Log(target: any, propertyName: string | Symbol) {
  console.log("Property Decorator");

  console.log(propertyName, target);
}

function Log2(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("Accessor Decorator");
  console.log(name);
  console.log(target);
  console.log(descriptor);
}

function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("Method Decorator");
  console.log(name);
  console.log(target);
  console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
  console.log("Parameter Decorator");
  console.log(name);
  console.log(target);
  console.log(position);
}

class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("Invalid price - should be positive!");
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * +tax;
  }
}
