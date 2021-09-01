abstract class Department {
  static fiscalYear = 2021;

  protected constructor(
    protected readonly id: string = "d1",
    public name: string,
    protected employees: string[] = []
  ) {}

  abstract describe(this: Department): void;

  addEmployee(employeeName: string) {
    this.employees.push(employeeName);
  }

  printEmployeesInFormation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }

  static createEmployee(name: string) {
    return { name };
  }
}

class AccountingDepartment extends Department {
  private lastReport: string = "";
  private static instance: AccountingDepartment;

  private constructor(id: string, private reports: string[] = []) {
    super(id, "Accounting");
  }

  static getInstance() {
    if (AccountingDepartment.instance) {
      return this.instance;
    }
    return new AccountingDepartment("d2");
  }

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("No report find.");
  }

  set mostRecentReport(value) {
    if (!value) {
      throw Error("Please, pass a valid input");
    }
    this.addReports(value);
  }

  addReports(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  getReports() {
    console.log(this.reports);
  }

  addEmployee(employeeName: string) {
    if (employeeName === "Sacha") return;
    super.addEmployee(employeeName);
  }

  describe() {
    console.log(`Accounting Department ID : ${this.id}`);
  }
}

class ITDepartment extends Department {
  admins: string[];

  constructor(id: string, admins: string[]) {
    super(id, "Information Technology");
    this.admins = admins;
  }

  describe() {
    console.log(`IT Department Id : ${this.id}, Admins : ${this.admins}`);
  }
}

const accountingDep = AccountingDepartment.getInstance();
accountingDep.addEmployee("Sacha Pignot");
accountingDep.addEmployee("Josiane Gilbert");
accountingDep.addEmployee("Sacha");
accountingDep.describe();
accountingDep.printEmployeesInFormation();
accountingDep.addReports("Report 1");
console.log("Last report : " + accountingDep.mostRecentReport);
accountingDep.mostRecentReport = "Report 2";
accountingDep.getReports();
console.log("Last report : " + accountingDep.mostRecentReport);

console.log(accountingDep);

const ITDep = new ITDepartment("d2", ["Sacha"]);
ITDep.addEmployee("Sacha Pignot");
ITDep.addEmployee("Josiane Gilbert");
ITDep.describe();
ITDep.printEmployeesInFormation();

const employee1 = Department.createEmployee("Sacha");
console.log(employee1);
console.log(Department.fiscalYear);
