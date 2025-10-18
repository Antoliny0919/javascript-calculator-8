import Calculator from "./Calculator.js";
import { Console } from "@woowacourse/mission-utils";
import { MESSAGES } from "./Constants.js";

class App {
  async run() {
    const input = await Console.readLineAsync(MESSAGES.INPUT);
    const calculator = new Calculator(input);
    const result = calculator.calculate();
    Console.print(MESSAGES.OUTPUT(result));
  }
}

export default App;
