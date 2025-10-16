import { Console } from "@woowacourse/mission-utils";
import { ERROR_MESSAGES, MESSAGES } from "./Constants.js";
import { RegexpValidator, LengthValidator, ArrayElementsValidator } from "./Validators.js";


class App {
  constructor() {
    this.delimiter = [',', ':'];
    this.validators = {
      customDelimiter: [
        new RegexpValidator(/\d/, ERROR_MESSAGES.INVALID_CUSTOM_DELIMITER_NUMBER),
        new LengthValidator(0, 2, ERROR_MESSAGES.INVALID_CUSTOM_DELIMITER_STRING),
      ],
      calculationString: [
        // 배열 내 모든 요소가 숫자인지 확인
        new ArrayElementsValidator(
          el => /^-?\d+$/.test(el),
          ERROR_MESSAGES.INVALID_FORMAT,
          true,
        ),
        // 배열 내 모든 요소가 양수인지 확인
        new ArrayElementsValidator(
          el => Number(el) > 0,
          ERROR_MESSAGES.INVALID_NEGATIVE_OR_ZERO,
          true,
        ),
      ]
    }
  }

  isValid(value, key) {
    for (const validators of this.validators[key]) {
      validators.validate(value);
    }
  }

  getCustomDelimiter(value) {
    if (value.startsWith('//')) {
      const [ delimiter, calculationString ] = value.slice(2,).split('\\n');
      this.isValid(delimiter, 'customDelimiter');
      return { 'customDelimiter': delimiter, 'calculationString': calculationString };
    }
    return { 'customDelimiter': undefined, 'calculationString': value };
  }

  makeCalculable(calculationString) {
    if (calculationString === "") {
      return [];
    }

    const standard = new RegExp(`[${this.delimiter.join('')}]`);
    const tokens = calculationString.split(standard);
    this.isValid(tokens, 'calculationString');
    return tokens.map(el => Number(el));
  }

  async run() {
    const input = await Console.readLineAsync(MESSAGES.INPUT);
    const { customDelimiter, calculationString } = this.getCustomDelimiter(input);
    if (customDelimiter) {
      this.delimiter.push(customDelimiter);
    }
    const tokens = this.makeCalculable(calculationString);
    const result = tokens.reduce((x, y) => x + y, 0);
    Console.print(MESSAGES.OUTPUT(result));
  }
}

export default App;
