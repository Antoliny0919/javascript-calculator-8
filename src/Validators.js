/**
* 정규식 기반으로 값이 유효한 패턴인지 검증합니다.
* 
* @example
* const validator = new RegexpValidator(/\d/, '숫자는 허용되지 않습니다.');
* validator.validate('123'); // Error: 숫자는 허용되지 않습니다.
*/
export class RegexpValidator {
  /**
   * 
   * @param {regexp} regexp - 검사에 사용할 정규식
   * @param {string} message - 에러 메시지
   */
  constructor(regexp, message) {
    this.regexp = regexp;
    this.message = message;
  }

  validate(value) {
    if (this.regexp.test(value)) {
      throw new Error(this.message);
    }
  }
}

/**
 * length프로퍼티를 기반으로 값의 길이를 검증합니다.
 * 
 * @example
 * const validator = new LengthValidator(0, 10, '문자의 길이는 10자 이하여야 합니다.');
 * validator.validate('Hello World!!'); // Error: 문자의 길이는 10자 이하여야 합니다.
 */
export class LengthValidator {
  /**
   * 
   * @param {number} start - 최소 글자 수
   * @param {number} end  - 최대 글자 수
   * @param {string} message - 에러 메시지
   */
  constructor(start, end, message) {
      this.start = start;
      this.end = end;
      this.message = message;
  }

  validate(value) {
    if (value.length <= this.start || value.length >= this.end) {
      throw new Error(this.message);
    }
  }
}

/**
 * 배열 내 요소를 순회하며 각 요소를 검증합니다.
 * 
 * @example
 * const validator = new ArrayElementsValidator(
 *  el => /^\d+$/.test(el),
 * '모든 요소는 숫자여야 합니다.'
 * );
 * validator.validate(['t', '1']); // Error: 모든 요소는 숫자여야 합니다.
 */
export class ArrayElementsValidator {
  /**
   * 
   * @param {function} func - 검증에 사용할 함수
   * @param {string} message - 에러 메시지
   */
  constructor(func, message) {
    this.func = func;
    this.message = message;
  }

  validate(arr) {
    if (!arr.every(this.func)) {
      throw new Error(this.message);
    }
  }
}
