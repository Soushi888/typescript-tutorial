function Logger(logString: string) {
  return (constructor: Function) => {
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();

        console.log("TEMPLATE FACTORY");
        const hookEL = document.getElementById(hookId);

        if (hookEL) {
          hookEL.innerHTML = template;
          hookEL.querySelector("h1")!.textContent = this.name;
        }
      }
    };
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

//---

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

const book1 = new Product("Book", 22.99);
const book2 = new Product("Book2", 22.99);

console.log(book1);
console.log(book2);

//---

function Autobind(
  _target: any,
  _methodName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      return originalMethod.bind(this);
    },
  };

  return adjDescriptor;
}

class Printer {
  message = "This Work !";

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();

const button = document.querySelector("button") as HTMLButtonElement;
button.addEventListener("click", p.showMessage);

function Required() {}

function PositiveNumber() {}

function validate(obj: Object): boolean {
  return true;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector("form")!;
courseForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const titleEl = document.getElementById("title") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);

  if (!validate(createdCourse)) {
    alert("Invalid input, please try again !");
  }
  console.log(createdCourse);
});
