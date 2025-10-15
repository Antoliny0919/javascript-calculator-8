import { Console } from "@woowacourse/mission-utils";


class App {
  constructor() {
    this.delimiter = [',', ':'];
  }

  getCustomDelimiter(value) {
    if (value.startsWith('//')) {
      const [ delimiter, calculationString ] = value.slice(2,).split('\\n');
      this.validateCustomDelimiter(delimiter);
      return { 'customDelimiter': delimiter, 'calculationString': calculationString }
    }
    return { 'customDelimiter': undefined, 'calculationString': value }
  }

  makeCalculable(calculationString) {
    const standard = new RegExp(`[${this.delimiter.join('')}]`);
    const tokens = calculationString.split(standard);
    this.validateCalculationString(tokens);
  }

  validateCustomDelimiter(delimiter) {
    this.validateIsNotNumber(delimiter);
    this.validateIsChar(delimiter);
  }

  validateIsNotNumber(value) {
    if (/\d/.test(value)) {
      throw new Error('[ERROR] 숫자는 커스텀 구분자로 사용할 수 없습니다.');
    }
  }

  validateIsChar(value) {
    if (value.length !== 1) {
      throw new Error('[ERROR] 문자열은 커스텀 구분자로 사용할 수 없습니다.');
    }
  }

  validateCalculationString(value) {
    this.validateFormat(value);
    this.validateIsAllPositive(value);
  }

  validateFormat(value) {
    // 배열 내 모든 요소가 숫자인지 확인
    if (!value.every(el => /^-?\d+$/.test(el))) {
      throw new Error('[ERROR] 계산할 문자열이 잘못된 형식입니다.');
    }
  }

  validateIsAllPositive(value) {
    // 배열 내 모든 요소가 숫자인지 확인
    if (!value.every(el => Number(el) > 0)) {
      throw new Error('[ERROR] 계산할 문자열은 양수만 가능합니다.');
    }
  }

  async run() {
    const input = await Console.readLineAsync('덧셈할 문자열을 입력해 주세요.\n');
    const { customDelimiter, calculationString } = this.getCustomDelimiter(input);
    if (customDelimiter) {
      // 커스텀 구분자 사용
      this.delimiter.push(customDelimiter);
    }
    this.makeCalculable(calculationString);
  }
}

export default App;
