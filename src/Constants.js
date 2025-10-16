export const ERROR_MESSAGES = Object.freeze({
    INVALID_CUSTOM_DELIMITER_NUMBER: '[ERROR] 숫자는 커스텀 구분자로 사용할 수 없습니다.',
    INVALID_CUSTOM_DELIMITER_STRING: '[ERROR] 문자열은 커스텀 구분자로 사용할 수 없습니다.',
    INVALID_FORMAT: '[ERROR] 계산할 문자열이 잘못된 형식입니다.',
    INVALID_NEGATIVE_OR_ZERO: '[ERROR] 계산할 문자열은 양수만 가능합니다.',
})

export const MESSAGES = Object.freeze({
    INPUT: '덧셈할 문자열을 입력해 주세요.\n',
    OUTPUT: (value) => `결과 : ${value}`,
})
