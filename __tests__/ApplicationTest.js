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

  test.each(
    [
      ['1,2,3', '6'],
      ['1:2:30', '33'],
      ['5:100:30,70', '205'],
      ['//;\\n10;20:30,40', '100'],
      ['//+\\n5+4+3+2+1', '15'],
      ['//Z\\n15Z25Z35Z45', '120'],
      ['//구\\n1구2,3:4구5', '15'],
      ['1000000000000000:200000,4000:90000000,100', '1000000090204100']
    ]
  )('유요한 입력 테스트', async(input, result) => {
    mockQuestions([input]);
    const logSpy = getLogSpy();
    const app = new App();
    await app.run();

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(`결과 : ${result}`));
  })
});

describe('커스텀 구분자 입력 예외', () => {
  test.each(['//5\\n152535', '//3nn\\n13nn23nn3'])('커스텀 숫자 구분자를 사용시 예외 발생', async (input) => {
    mockQuestions([input]);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR] 숫자는 커스텀 구분자로 사용할 수 없습니다.');
  })

  test.each(
    [
      '//;;\\n1;;2;;3',
      '//-----\\n1-----5-----4',
      '//\\n1:2:3',
    ]
  )('문자가 아닌 커스텀 구분자를 사용시 예외 발생', async (input) => {
    mockQuestions([input]);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR] 커스텀 구분자는 한 글자 문자여야 합니다.')
  })
});

describe('계산할 문자열 입력 예외', () => {
  test.each(
    [
      '1,2.3',
      '1,2;3+4',
      '//;\\n1;2-3',
      ',1,2,3',
      '1:2:3:',
      ',1,2:3:',
    ]
  )('잘못된 형식의 문자열일때 예외 발생', async (input) => {
    mockQuestions([input]);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR] 계산할 문자열이 잘못된 형식입니다.');
  })

  test.each(['1,-2,3', '0,1,2'])('계산할 대상이 양수가 아닌 문자열일때 예외 발생', async (input) => {
    mockQuestions([input]);

    const app = new App();

    await expect(app.run()).rejects.toThrow('[ERROR] 계산할 문자열은 양수만 가능합니다.');
  })
});
