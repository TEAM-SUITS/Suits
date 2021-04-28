'use strict';

var badwordsData = require('./badwords.json');
/* -------------------------------------------------------------------------- */

module.exports = (function () {
  var badwordsArray = badwordsData.words;
  var escapedBadwordsArray = badwordsArray.map(function (badword) {
    var specialCharacters = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
    var backSlash = '\\';

    if (specialCharacters.test(badword)) {
      return badword.replace(specialCharacters, backSlash + '$&');
    }

    return badword;
  });
  var badwordsString = escapedBadwordsArray.join('+|').slice(2, -1);
  var badwordsRegEx = new RegExp(badwordsString, 'g');
  return {
    /**
     * 욕설 및 비속어를 금지합니다.
     * @param {string} content - 욕설 및 비속어 포함 여부를 검사할 대상 문자열
     * @returns 욕설 및 비속어가 포함되지 않은 경우에만 인자를 그대로 반환합니다.
     */
    ban: function ban() {
      var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      if (badwordsRegEx.test(content)) {
        // 인자로 전달한 content가 비속어를 포함하고 있을 경우의 처리를 작성해주세요.
        return '부적절한 단어가 포함되어 있습니다.';
      } // 비속어를 포함하지 않은 정상적인 경우의 처리를 작성해주세요.

      return content;
    },

    /**
     * 욕설 및 비속어를 placeholder로 대체합니다.
     * @param {string} content - 욕설 및 비속어 포함 여부를 검사할 대상 문자열
     * @param {string} placeholder - 욕설 및 비속어를 대체할 문자열(기본값: **)
     * @returns 욕설 및 비속어가 포함된 경우에는 해당 단어들 대신 placeholder로 대체된 문자열이 반환되며,
     *          욕설 및 비속어가 포함되지 않은 경우에는 인자를 그대로 반환합니다.
     */
    filter: function filter() {
      var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var placeholder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '**';

      // 비속어가 포함된 경우
      if (badwordsRegEx.test(content)) {
        return content.replace(badwordsRegEx, placeholder);
      } // 비속어가 포함되지 않은 경우

      return content;
    },

    /**
     * 욕설 및 비속어 목록에 새로운 단어를 추가합니다.
     * @param {...string} words - 욕설 및 비속어 목록에 추가할 단어(들)
     */
    addWords: function addWords() {
      var _badwordsArray;

      (_badwordsArray = badwordsArray).push.apply(_badwordsArray, arguments);
    },

    /**
     * 욕설 및 비속어 목록에서 기존 단어를 제거합니다.
     * @param {...string} words - 욕설 및 비속어 목록에서 제거할 단어(들)
     */
    removeWords: function removeWords() {
      for (var _len = arguments.length, words = new Array(_len), _key = 0; _key < _len; _key++) {
        words[_key] = arguments[_key];
      }

      words.forEach(function (word) {
        badwordsArray = badwordsArray.filter(function (badword) {
          return badword !== word;
        });
      });
    },

    /**
     * 욕설 및 비속어 목록에서 전체 단어를 제거합니다.
     */
    removeAllWords: function removeAllWords() {
      badwordsArray = [];
    },
  };
})();
