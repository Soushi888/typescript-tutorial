// const names: Array<string> = ["Sacha", "Soushi888"];

const promise: Promise<string> = new Promise((resolve) => {
  setTimeout(() => {
    resolve("Done !");
  }, 2000);
});

promise.then((data) => {
  console.log(data.split(" "));
  // data.toPrecision(2);
});

function merge<T extends object, U extends object>(objA: T, objB: U) {
  return { ...objA, ...objB };
}

console.log(merge({ firstName: "Sacha" }, { lastName: "Pignot" }));

const mergerObject = merge({ firstName: "Sacha" }, { age: 28 });
const mergerObject2 = merge(
  { firstName: "Sacha", hobbies: ["music"] },
  { age: 28 }
);
console.log(mergerObject.age);
console.log(mergerObject2.hobbies);
console.log(mergerObject2);

interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText: string = "Got no value.";
  if (element.length === 1) {
    descriptionText = "Got 1 element.";
  } else if (element.length > 1) {
    descriptionText = `Got ${element.length} elements.`;
  }
  return [element, descriptionText];
}

console.log(countAndDescribe(["one", "two"]));

function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return `Key : ${key}\nValue: ${obj[key]}`;
}

console.log(extractAndConvert({ name: "Soushi" }, "name"));

class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) return;
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("item one");
textStorage.addItem("item two");
textStorage.addItem("item tree");
textStorage.removeItem("item two");
console.log(textStorage.getItems());

// const objectStorage = new DataStorage<object>();
// const sachaObj = { name: "Sacha" };
// objectStorage.addItem(sachaObj);
// objectStorage.addItem({ name: "Soushi" });
// objectStorage.addItem({ name: "Shizore" });
// objectStorage.removeItem(sachaObj);
// console.log(objectStorage.getItems());

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;

  return courseGoal as CourseGoal;
}

const names: Readonly<string[]> = ["Sacha", "Soushi"];
// names.push("Shizore");
console.log(names)
