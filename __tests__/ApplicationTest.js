import App from '../src/App.js';
import { MissionUtils } from '@woowacourse/mission-utils';

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();
  return logSpy;
};

describe('문자열 계산기', () => {
  test('커스텀 구분자 사용', async () => {
    const inputs = ['//;\\n1'];
    mockQuestions(inputs);

    const logSpy = getLogSpy();
    const outputs = ['결과 : 1'];

    const app = new App();
    await app.run();

    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
  });

  test('예외 테스트', async () => {
    const inputs = ['-1,2,3'];
    mockQuestions(inputs);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR]');
  });
});

describe('커스텀 구분자 입력 예외', () => {
  test.each(['//5\\n152535', '//3nn\\n13nn23nn3'])('커스텀 숫자 구분자를 사용시 예외 발생', async (input) => {
    mockQuestions([input]);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR] 숫자는 커스텀 구분자로 사용할 수 없습니다.');
  })

  test.each(['//;;\\n1;;2;;3', '//-----\\n1-----5-----4'])('커스텀 문자열 구분자를 사용시 예외 발생', async (input) => {
    mockQuestions([input]);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR] 문자열은 커스텀 구분자로 사용할 수 없습니다.')
  })
})
