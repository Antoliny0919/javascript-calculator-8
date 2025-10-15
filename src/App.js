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

  async run() {
    const input = await Console.readLineAsync('덧셈할 문자열을 입력해 주세요.\n');
    const { customDelimiter, calculationString } = this.getCustomDelimiter(input);
    if (customDelimiter) {
      // 커스텀 구분자 사용
      this.delimiter.push(customDelimiter);
    }
  }
}

export default App;
