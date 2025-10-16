import { Console } from "@woowacourse/mission-utils";
import { ERROR_MESSAGES, MESSAGES } from "./Constants";


class App {
  constructor() {
    this.delimiter = [',', ':'];
  }

  getCustomDelimiter(value) {
    if (value.startsWith('//')) {
      const [ delimiter, calculationString ] = value.slice(2,).split('\\n');
      this.validateCustomDelimiter(delimiter);
      return { 'customDelimiter': delimiter, 'calculationString': calculationString };
    }
    return { 'customDelimiter': undefined, 'calculationString': value };
  }

  makeCalculable(calculationString) {
    const standard = new RegExp(`[${this.delimiter.join('')}]`);
    const tokens = calculationString.split(standard);
    this.validateCalculationString(tokens);
    return tokens.map(el => Number(el));
  }

  validateCustomDelimiter(delimiter) {
    this.validateIsNotNumber(delimiter);
    this.validateIsChar(delimiter);
  }

  validateIsNotNumber(value) {
    if (/\d/.test(value)) {
      throw new Error(ERROR_MESSAGES.INVALID_CUSTOM_DELIMITER_NUMBER);
    }
  }

  validateIsChar(value) {
    if (value.length !== 1) {
      throw new Error(ERROR_MESSAGES.INVALID_CUSTOM_DELIMITER_STRING);
    }
  }

  validateCalculationString(value) {
    this.validateFormat(value);
    this.validateIsAllPositive(value);
  }

  validateFormat(value) {
    // 배열 내 모든 요소가 숫자인지 확인
    if (!value.every(el => /^-?\d+$/.test(el))) {
      throw new Error(ERROR_MESSAGES.INVALID_FORMAT);
    }
  }

  validateIsAllPositive(value) {
    // 배열 내 모든 요소가 양수인지 확인
    if (!value.every(el => Number(el) > 0)) {
      throw new Error(ERROR_MESSAGES.INVALID_NEGATIVE_OR_ZERO);
    }
  }

  async run() {
    const input = await Console.readLineAsync(MESSAGES.INPUT);
    const { customDelimiter, calculationString } = this.getCustomDelimiter(input);
    if (customDelimiter) {
      // 커스텀 구분자 사용
      this.delimiter.push(customDelimiter);
    }
    const tokens = this.makeCalculable(calculationString);
    const result = tokens.reduce((x, y) => x + y);
    Console.print(MESSAGES.OUTPUT(result));
  }
}

export default App;
