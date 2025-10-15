import { Console } from "@woowacourse/mission-utils";


class App {
  constructor() {
    this.delimiter = [',', ':'];
  }

  checkCustomDelimiter(value) {
    if (value.startsWith('//')) {
      return true;
    }
    return false;
  }

  async run() {
    const input = await Console.readLineAsync('덧셈할 문자열을 입력해 주세요.\n');
    if (this.checkCustomDelimiter(input)) {
      // 커스텀 구분자 사용
    } else {

    }
  }
}

export default App;
