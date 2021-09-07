// Intersection types
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: "Sacha",
  privileges: ["create-server", "delete-server"],
  startDate: new Date(),
};

const e2: Admin = {
  name: "Soushi",
  privileges: ["fire-someone", "hire-someone"],
};

const e3: Employee = {
  name: "Shizor",
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

/* Type Guards */

/*
  Concatenate if string or addition if numbers with function overloads
 */
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: number, b: string): string;
function add(a: string, b: number): string;
function add(a: Combinable, b: Combinable): Combinable {
  // Type Guard #1 -> typeof condition
  // Work with JS primitives types
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

console.log(add("hello ", "world").split(" "));
console.log(add(5, "8"));
console.log(add(5, 3));

type UnknownEmployee = Admin | Employee;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log(`Name : ${emp.name}`);

  // Type Guard #2 -> if in
  // Check if a property is in a Type
  if ("privileges" in emp) {
    console.log(`Privileges : ${emp.privileges}`);
  }

  if ("startDate" in emp) {
    console.log(`Start Date : ${emp.startDate}`);
  }
}

printEmployeeInformation(e1);
printEmployeeInformation(e2);
printEmployeeInformation(e3);

class Car {
  drive() {
    console.log("Driving...");
  }
}

class Truck {
  drive() {
    console.log("Driving a truck...");
  }

  loadCargo(amount: number) {
    console.log(`Load ${amount}kg of cargo...`);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();

  // Type Guard #3 -> if instanceof
  // Check if object is an instance of a specific class
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(8);
  }
}

useVehicle(v1);
useVehicle(v2);

// Discriminated Union
interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
      break;
  }

  console.log(`Moving speed : ${speed}km/h`);
}

/* Type Casting */
const userInputEl = <HTMLInputElement>document.getElementById("user-input");
const userOutputEl = <HTMLHeadElement>document.getElementById("user-output");
// const userInputEl = document.getElementById("user-input");

// const userInputEl = document.getElementById("user-input") as HTMLInputElement;
// const userOutputEl = document.getElementById("user-output") as HTMLHeadElement;
// if (userInputEl) {
userInputEl.addEventListener("input", () => {
  // userOutputEl.innerHTML = (userInputEl as HTMLInputElement).value;
  userOutputEl.innerHTML = userInputEl.value;
});
// }

/* Index Properties */

interface ErrorContainer {
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  email: "not a valid email!",
  username: "not a valid username!",
};

/* Optional chaining */
const fetchedUserData = {
  id: "u1",
  name: "Sacha",
  job: { title: "CTO", description: "Do the architecture." },
};

const fetchedUserData2 = {
  id: "u1",
  name: "Sacha",
};

console.log(fetchedUserData.job?.title);

// const userInput = "";
const userInput = undefined;

const storedData = userInput ?? "DEFAULT"; // null or undefined fallback

console.log(storedData);
