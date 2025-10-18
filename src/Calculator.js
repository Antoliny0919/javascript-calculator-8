import { RegexpValidator, LengthValidator, ArrayElementsValidator } from './Validators';
import { ERROR_MESSAGES } from './Constants';

const DEFAULT_DELIMITER = [',', ':'];
const CUSTOM_DELIMITER_PREFIX = '//';
const CUSTOM_DELIMITER_SUFFIX = '\\n';

class Calculator {
  constructor(input) {
    this.input = input;
    this.delimiter = [...DEFAULT_DELIMITER];
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
        ),
        // 배열 내 모든 요소가 양수인지 확인
        new ArrayElementsValidator(
          el => Number(el) > 0,
          ERROR_MESSAGES.INVALID_NEGATIVE_OR_ZERO,
        ),
      ]
    }
  }

  addDelimiter(delimiter) {
    let newDelimiter = delimiter;
    if (newDelimiter === '\\') {
      newDelimiter = '\\\\';
    }
    this.delimiter.push(newDelimiter);
  }

  runValidators(value, key) {
    for (const validators of this.validators[key]) {
      validators.validate(value);
    }
  }

  getCustomDelimiter(value) {
    if (value.startsWith(CUSTOM_DELIMITER_PREFIX)) {
      const [ delimiter, calculationString ] = value.slice(2,).split(CUSTOM_DELIMITER_SUFFIX);
      this.runValidators(delimiter, 'customDelimiter');
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
    this.runValidators(tokens, 'calculationString');
    return tokens.map(el => Number(el));
  }

  calculate() {
    const { customDelimiter, calculationString } = this.getCustomDelimiter(this.input);
    if (customDelimiter) {
      this.addDelimiter(customDelimiter);
    }
    const tokens = this.makeCalculable(calculationString);
    const result = tokens.reduce((x, y) => x + y, 0);
    return result;
  }
}

export default Calculator;
