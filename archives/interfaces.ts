interface addFn {
  (a: number, b: number): number;
}

let addFn2: addFn = (a, b) => {
  return a + b;
};

console.log(addFn2(2, 6));

interface Named {
  readonly name?: string;
  outputName?: string;
}

interface Greetable extends Named {
  greet(phrase: string): void;
}

class Person implements Greetable {
  name;
  age = 28;

  constructor(n?: string) {
    if (n) {
      this.name = n;
    }
  }

  greet(phrase?: string) {
    if (this.name) {
      console.log(`${phrase} ${this.name}`);
    } else {
      if (!phrase) {
        console.log("Hi.");
      } else {
        console.log(phrase);
      }
    }
  }
}

let user1 = new Person();
user1.greet("Hi there, I am");

let user2 = new Person("Soushi");
user2.greet("I am the");

let user3 = new Person();
user3.greet("Hi !");
user3.greet();
