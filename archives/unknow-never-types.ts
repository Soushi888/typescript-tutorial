let userInput: unknown;
let userName: string;

userInput = "Sacha";

if (typeof userInput === "string") {
  userName = userInput;
}

// The application will crash so there is absolutely no return value (never return type)
function generateError(message: string, code: number): never {
  throw { message, errorCode: code };
}

generateError("An error occurred", 500);
